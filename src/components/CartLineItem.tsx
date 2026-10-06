import { Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CartItemView } from "@/mocks/types";
import { AppLink } from "./AppLink";
import { QuantitySelector } from "./QuantitySelector";

type Props = {
  item: CartItemView;
  onChangeQuantity: (productId: string, qtd: number) => void;
  onRemove: (productId: string) => void;
  compact?: boolean;
};

export function CartLineItem({ item, onChangeQuantity, onRemove, compact }: Props) {
  return (
    <li className={cn("flex gap-3 py-4", !item.disponivel && "opacity-90")}>
      <AppLink href={`/produto/${item.slug}`} className={cn("shrink-0 overflow-hidden rounded-xl bg-muted", compact ? "size-20" : "size-24 md:size-28")}>
        {item.imagem && <img src={item.imagem} alt="" loading="lazy" width={112} height={112} className="size-full object-cover" />}
      </AppLink>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="eyebrow">{item.marca}</span>
        <AppLink href={`/produto/${item.slug}`} className="line-clamp-2 text-sm text-ink hover:text-rose">
          {item.nome}{item.volume && <span className="text-taupe"> · {item.volume}</span>}
        </AppLink>
        {!item.disponivel && <p className="text-sm font-medium text-destructive">Esgotado — remova para continuar</p>}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          {item.disponivel ? (
            <QuantitySelector value={item.quantidade} onChange={(q) => onChangeQuantity(item.productId, q)} label={`Quantidade de ${item.nome}`} className="h-11 [&_button]:size-10" />
          ) : <span />}
          <div className="text-right">
            {item.precoOriginal > item.precoUnitario && (
              <p className="text-xs text-taupe line-through">{formatPrice(item.precoOriginal * item.quantidade)}</p>
            )}
            <p className="font-medium">{formatPrice(item.subtotal)}</p>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => onRemove(item.productId)} aria-label={`Remover ${item.nome}`}
        className="grid size-11 shrink-0 place-items-center self-start rounded-full text-taupe hover:bg-secondary hover:text-rose">
        <Trash2 className="size-4" />
      </button>
    </li>
  );
}
