import { cn } from "@/lib/utils";
import { discountPercent, formatPrice } from "@/lib/format";

type PriceProps = { preco: number; precoPromocional: number | null; size?: "sm" | "lg"; className?: string };

export function Price({ preco, precoPromocional, size = "sm", className }: PriceProps) {
  const promo = discountPercent(preco, precoPromocional) > 0;
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <span className={cn("font-medium text-ink", size === "lg" ? "text-2xl" : "text-base")}>
        {formatPrice(promo ? precoPromocional! : preco)}
      </span>
      {promo && (
        <span className={cn("text-taupe line-through", size === "lg" ? "text-base" : "text-sm")}>
          <span className="sr-only">De </span>
          {formatPrice(preco)}
        </span>
      )}
    </div>
  );
}

export function DiscountBadge({ preco, precoPromocional, className }: { preco: number; precoPromocional: number | null; className?: string }) {
  const pct = discountPercent(preco, precoPromocional);
  if (!pct) return null;
  return <span className={cn("rounded-full bg-rose px-2.5 py-1 text-xs font-medium text-primary-foreground", className)}>-{pct}%</span>;
}

export function StockBadge({ disponivel, className }: { disponivel: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", disponivel ? "text-success" : "text-taupe", className)}>
      <span className={cn("size-2 rounded-full", disponivel ? "bg-success" : "bg-taupe")} aria-hidden="true" />
      {disponivel ? "Disponível" : "Esgotado"}
    </span>
  );
}
