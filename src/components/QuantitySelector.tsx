import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { value: number; onChange: (v: number) => void; min?: number; max?: number; label?: string; className?: string };

export function QuantitySelector({ value, onChange, min = 1, max = 10, label = "Quantidade", className }: Props) {
  return (
    <div role="group" aria-label={label} className={cn("inline-flex h-12 items-center rounded-full border border-input bg-card", className)}>
      <button type="button" aria-label="Diminuir quantidade" disabled={value <= min} onClick={() => onChange(value - 1)}
        className="grid size-11 place-items-center rounded-full text-ink hover:bg-secondary disabled:opacity-40">
        <Minus className="size-4" />
      </button>
      <span className="w-8 text-center text-base tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="Aumentar quantidade" disabled={value >= max} onClick={() => onChange(value + 1)}
        className="grid size-11 place-items-center rounded-full text-ink hover:bg-secondary disabled:opacity-40">
        <Plus className="size-4" />
      </button>
    </div>
  );
}
