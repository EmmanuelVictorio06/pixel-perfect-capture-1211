import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { maskCep } from "@/lib/format";
import type { Address } from "@/mocks/types";
import { FormField } from "./FormField";
import { InlineAlert } from "./States";

export type AddressDraft = Omit<Address, "id" | "padrao">;

type Props = {
  value: AddressDraft;
  onChange: (v: AddressDraft) => void;
  onCepLookup: (cep: string) => void;
  cepStatus: "idle" | "loading" | "ok" | "not_sp" | "not_found";
  onSubmit: () => void;
  submitLabel?: string;
};

export function AddressForm({ value, onChange, onCepLookup, cepStatus, onSubmit, submitLabel = "Salvar endereço" }: Props) {
  const set = (k: keyof AddressDraft) => (e: { target: { value: string } }) => onChange({ ...value, [k]: e.target.value });
  const submit = (e: FormEvent) => { e.preventDefault(); onSubmit(); };
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-6" noValidate>
      <div className="relative sm:col-span-3">
        <FormField label="CEP" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={value.cep}
          error={cepStatus === "not_found" ? "CEP não encontrado. Confira os números." : undefined}
          onChange={(e) => { const c = maskCep(e.target.value); onChange({ ...value, cep: c }); if (c.length === 9) onCepLookup(c); }} />
        {cepStatus === "loading" && <Loader2 className="absolute right-4 top-10 size-4 animate-spin text-taupe" aria-label="Buscando CEP" />}
      </div>
      {cepStatus === "not_sp" && (
        <div className="sm:col-span-6"><InlineAlert tone="warning">No momento entregamos <strong>somente no estado de São Paulo</strong>. Informe um CEP de SP.</InlineAlert></div>
      )}
      <FormField className="sm:col-span-3" label="Apelido (ex.: Casa)" value={value.apelido} onChange={set("apelido")} />
      <FormField className="sm:col-span-6" label="Destinatário" autoComplete="name" value={value.destinatario} onChange={set("destinatario")} />
      <FormField className="sm:col-span-4" label="Rua" autoComplete="address-line1" value={value.logradouro} onChange={set("logradouro")} />
      <FormField className="sm:col-span-2" label="Número" inputMode="numeric" value={value.numero} onChange={set("numero")} />
      <FormField className="sm:col-span-3" label="Complemento (opcional)" value={value.complemento ?? ""} onChange={set("complemento")} />
      <FormField className="sm:col-span-3" label="Bairro" value={value.bairro} onChange={set("bairro")} />
      <FormField className="sm:col-span-4" label="Cidade" value={value.cidade} onChange={set("cidade")} />
      <FormField className="sm:col-span-2" label="UF" value={value.uf} readOnly />
      <Button type="submit" className="sm:col-span-6" disabled={cepStatus === "not_sp"}>{submitLabel}</Button>
    </form>
  );
}
