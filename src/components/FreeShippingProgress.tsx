import { Truck } from "lucide-react";
import { formatPrice } from "@/lib/format";

export function FreeShippingProgress({ subtotal, threshold }: { subtotal: number; threshold: number }) {
  const missing = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
  return (
    <div className="rounded-2xl bg-secondary/60 p-4">
      <p className="flex items-center gap-2 text-sm text-ink">
        <Truck className="size-4 text-rose" aria-hidden="true" />
        {missing > 0 ? <>Faltam <strong className="font-medium">{formatPrice(missing)}</strong> para frete grátis</> : <strong className="font-medium">Você ganhou frete grátis!</strong>}
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-card" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso para frete grátis">
        <div className="h-full rounded-full bg-rose transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
