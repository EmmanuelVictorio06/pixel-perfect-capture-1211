import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, maskCep } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ShippingQuote } from "@/mocks/types";

type Props = {
  cep: string;
  onCepChange: (cep: string) => void;
  onCalculate: () => void;
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  quotes: ShippingQuote[];
  freeShipping?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

export function ShippingCalculator({ cep, onCepChange, onCalculate, status, error, quotes, freeShipping, selectedId, onSelect }: Props) {
  const submit = (e: FormEvent) => { e.preventDefault(); onCalculate(); };
  return (
    <div className="space-y-3">
      <form onSubmit={submit} className="space-y-1.5">
        <label htmlFor="cep-frete" className="text-sm text-ink">Calcular frete</label>
        <div className="flex gap-2">
          <Input id="cep-frete" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={cep}
            onChange={(e) => onCepChange(maskCep(e.target.value))} aria-invalid={!!error} aria-describedby={error ? "cep-frete-err" : undefined} />
          <Button type="submit" variant="outline" disabled={status === "loading"} className="shrink-0">
            {status === "loading" ? <Loader2 className="animate-spin" aria-label="Calculando" /> : "Calcular"}
          </Button>
        </div>
        {error && <p id="cep-frete-err" className="text-sm text-destructive">{error}</p>}
        <a href="https://buscacepinter.correios.com.br" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs text-taupe underline">Não sei meu CEP</a>
      </form>
      {status === "success" && (
        <ul className="space-y-2" aria-label="Opções de frete">
          {quotes.map((q) => {
            const selectable = !!onSelect;
            const selected = selectedId === q.servicoId;
            const inner = (
              <>
                <span className="flex flex-col text-left">
                  <span className="text-sm text-ink">{q.transportadora} · {q.servicoNome}</span>
                  <span className="text-xs text-taupe">Até {q.prazoDias} {q.prazoDias === 1 ? "dia útil" : "dias úteis"}</span>
                </span>
                <span className={cn("text-sm font-medium", freeShipping && "text-success")}>{freeShipping ? "Grátis" : formatPrice(q.preco)}</span>
              </>
            );
            return (
              <li key={q.servicoId}>
                {selectable ? (
                  <button type="button" onClick={() => onSelect(q.servicoId)} aria-pressed={selected}
                    className={cn("flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border bg-card px-4 py-2", selected ? "border-rose ring-2 ring-rose/20" : "border-border hover:border-gold")}>
                    {inner}
                  </button>
                ) : (
                  <div className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
