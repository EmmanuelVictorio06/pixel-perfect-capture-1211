import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CartItemView } from "@/mocks/types";

type Props = {
  items?: CartItemView[];
  subtotal: number;
  discount?: number;
  shipping: number | null;
  total: number;
  collapsibleOnMobile?: boolean;
  footer?: ReactNode;
};

export function OrderSummary({ items, subtotal, discount = 0, shipping, total, collapsibleOnMobile, footer }: Props) {
  const [open, setOpen] = useState(false);
  const body = (
    <div className="space-y-4">
      {items && (
        <ul className="space-y-3">
          {items.map((i) => (
            <li key={i.productId} className="flex items-center gap-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                {i.imagem && <img src={i.imagem} alt="" className="size-full object-cover" loading="lazy" />}
                <span className="absolute -right-0 -top-0 grid size-5 place-items-center rounded-bl-lg bg-ink text-[0.65rem] text-primary-foreground">{i.quantidade}</span>
              </span>
              <span className="line-clamp-2 flex-1 text-sm">{i.nome}</span>
              <span className="text-sm">{formatPrice(i.subtotal)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between"><dt className="text-taupe">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        {discount > 0 && <div className="flex justify-between text-success"><dt>Desconto</dt><dd>-{formatPrice(discount)}</dd></div>}
        <div className="flex justify-between"><dt className="text-taupe">Frete</dt><dd>{shipping === null ? "Calcule acima" : shipping === 0 ? <span className="text-success">Grátis</span> : formatPrice(shipping)}</dd></div>
        <div className="flex justify-between border-t border-border pt-3 text-base"><dt className="font-medium">Total</dt><dd className="font-serif text-2xl">{formatPrice(total)}</dd></div>
      </dl>
      {footer}
    </div>
  );
  return (
    <section aria-labelledby="resumo-titulo" className="rounded-2xl bg-card p-5 shadow-soft">
      {collapsibleOnMobile ? (
        <>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="resumo-corpo"
            className="flex min-h-11 w-full items-center justify-between lg:pointer-events-none">
            <h2 id="resumo-titulo" className="text-2xl">Resumo do pedido</h2>
            <span className="flex items-center gap-2 text-sm lg:hidden">
              {formatPrice(total)} <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
            </span>
          </button>
          <div id="resumo-corpo" className={cn("mt-4 lg:block", open ? "block" : "hidden")}>{body}</div>
        </>
      ) : (
        <>
          <h2 id="resumo-titulo" className="mb-4 text-2xl">Resumo do pedido</h2>
          {body}
        </>
      )}
    </section>
  );
}
