import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { CartItemView } from "@/mocks/types";
import { AppLink } from "./AppLink";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingProgress } from "./FreeShippingProgress";
import { EmptyState } from "./States";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  items: CartItemView[];
  freeShippingThreshold: number;
  onChangeQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
};

export function CartDrawer({ open, onOpenChange, items, freeShippingThreshold, onChangeQuantity, onRemove }: Props) {
  const subtotal = items.reduce((a, i) => a + i.subtotal, 0);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-serif text-2xl">Sua sacola</SheetTitle>
          <SheetDescription>{items.length} {items.length === 1 ? "item" : "itens"}</SheetDescription>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="p-5"><EmptyState title="Sua sacola está vazia" description="Que tal conhecer nossos queridinhos?" /></div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <div className="pt-4"><FreeShippingProgress subtotal={subtotal} threshold={freeShippingThreshold} /></div>
              <ul className="divide-y divide-border">
                {items.map((i) => <CartLineItem key={i.productId} item={i} compact onChangeQuantity={onChangeQuantity} onRemove={onRemove} />)}
              </ul>
            </div>
            <div className="space-y-3 border-t border-border bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex justify-between"><span className="text-taupe">Subtotal</span><span className="font-serif text-2xl">{formatPrice(subtotal)}</span></div>
              <Button asChild className="w-full"><AppLink href="/carrinho" onClick={() => onOpenChange(false)}>Ver carrinho</AppLink></Button>
              <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>Continuar comprando</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
