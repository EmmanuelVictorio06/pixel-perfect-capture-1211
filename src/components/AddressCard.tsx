import { MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Address } from "@/mocks/types";

export function AddressCard({ address, selected, action, onSelect }: { address: Address; selected?: boolean; action?: ReactNode; onSelect?: () => void }) {
  const a = address;
  const body = (
    <>
      <MapPin className="mt-0.5 size-5 shrink-0 text-rose" aria-hidden="true" />
      <div className="flex-1 text-left text-sm">
        <p className="flex items-center gap-2 font-medium text-ink">
          {a.apelido}
          {a.padrao && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-normal text-rose-dark">Padrão</span>}
        </p>
        <p className="text-taupe">{a.logradouro}, {a.numero}{a.complemento ? ` — ${a.complemento}` : ""}</p>
        <p className="text-taupe">{a.bairro} · {a.cidade}/{a.uf} · {a.cep}</p>
      </div>
    </>
  );
  const cls = cn("flex w-full gap-3 rounded-2xl border bg-card p-4", selected ? "border-rose ring-2 ring-rose/20" : "border-border");
  return onSelect ? (
    <button type="button" onClick={onSelect} aria-pressed={selected} className={cn(cls, "min-h-11 hover:border-gold")}>{body}</button>
  ) : (
    <div className={cls}>{body}{action}</div>
  );
}
