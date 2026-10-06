import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusFlow, statusLabels } from "@/mocks/commerce";
import type { OrderStatus } from "@/mocks/types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const tone =
    status === "entregue" ? "bg-success/10 text-success"
    : status === "cancelado" || status === "reembolsado" ? "bg-muted text-taupe"
    : status === "aguardando_pagamento" ? "bg-warning/10 text-warning"
    : "bg-secondary text-rose-dark";
  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", tone)}>{statusLabels[status]}</span>;
}

export function OrderTimeline({ status }: { status: OrderStatus }) {
  if (status === "cancelado" || status === "reembolsado") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-muted p-4" role="status">
        <span className="grid size-9 place-items-center rounded-full bg-taupe text-primary-foreground"><X className="size-4" aria-hidden="true" /></span>
        <div>
          <p className="font-medium">{statusLabels[status]}</p>
          <p className="text-sm text-taupe">{status === "cancelado" ? "Este pedido foi cancelado." : "O valor foi devolvido para a forma de pagamento original."}</p>
        </div>
      </div>
    );
  }
  const idx = statusFlow.indexOf(status);
  return (
    <ol className="space-y-0" aria-label="Andamento do pedido">
      {statusFlow.map((s, i) => {
        const done = i <= idx;
        return (
          <li key={s} className="flex gap-3" aria-current={i === idx ? "step" : undefined}>
            <div className="flex flex-col items-center">
              <span className={cn("grid size-7 place-items-center rounded-full border", done ? "border-rose bg-rose text-primary-foreground" : "border-border bg-card")}>
                {done && <Check className="size-3.5" aria-hidden="true" />}
              </span>
              {i < statusFlow.length - 1 && <span className={cn("w-px flex-1 min-h-6", i < idx ? "bg-rose" : "bg-border")} />}
            </div>
            <p className={cn("pb-5 pt-0.5 text-sm", i === idx ? "font-medium text-ink" : done ? "text-ink" : "text-taupe")}>{statusLabels[s]}</p>
          </li>
        );
      })}
    </ol>
  );
}
