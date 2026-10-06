import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { AppLink } from "@/components/AppLink";
import { CartLineItem } from "@/components/CartLineItem";
import { FreeShippingProgress } from "@/components/FreeShippingProgress";
import { OrderSummary } from "@/components/OrderSummary";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { EmptyState, InlineAlert } from "@/components/States";
import { StickyActionBar } from "@/components/StickyActionBar";
import { StoreLayout } from "@/components/StoreLayout";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { FREE_SHIPPING_THRESHOLD, shippingQuotes } from "@/mocks/commerce";
import { useStoreShell } from "./useStoreShell";

export function CartPage() {
  const { shell, items, changeQty, remove } = useStoreShell();
  const [cep, setCep] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sel, setSel] = useState<string | null>(null);
  const subtotal = items.reduce((a, i) => a + i.subtotal, 0);
  const free = subtotal >= FREE_SHIPPING_THRESHOLD;
  const quote = shippingQuotes.find((q) => q.servicoId === sel);
  const shipping = quote ? (free ? 0 : quote.preco) : free ? 0 : null;
  const total = subtotal + (shipping ?? 0);
  const blocked = items.some((i) => !i.disponivel);
  const calc = () => {
    if (cep.length !== 9) return setStatus("error");
    setStatus("loading");
    setTimeout(() => { setStatus("success"); setSel(shippingQuotes[0].servicoId); }, 700);
  };
  const checkout = (
    <Button asChild={!blocked} size="lg" className="w-full" disabled={blocked}>
      {blocked ? <span>Finalizar compra</span> : <AppLink href="/checkout">Finalizar compra</AppLink>}
    </Button>
  );

  return (
    <StoreLayout {...shell}>
      <div className="container-page py-8">
        <h1 className="text-4xl md:text-5xl">Carrinho</h1>
        {items.length === 0 ? (
          <EmptyState className="mt-8" icon={ShoppingBag} title="Seu carrinho está vazio" description="Explore nossos produtos e monte seu ritual de cuidados."
            action={<Button asChild><AppLink href="/produtos">Ver produtos</AppLink></Button>} />
        ) : (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_24rem]">
            <div className="space-y-4">
              <FreeShippingProgress subtotal={subtotal} threshold={FREE_SHIPPING_THRESHOLD} />
              {blocked && <InlineAlert tone="error">Há um item esgotado no carrinho. Remova-o para finalizar a compra.</InlineAlert>}
              <ul className="divide-y divide-border rounded-2xl bg-card px-4 shadow-soft">
                {items.map((i) => <CartLineItem key={i.productId} item={i} onChangeQuantity={changeQty} onRemove={remove} />)}
              </ul>
            </div>
            <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-card p-5 shadow-soft">
                <ShippingCalculator cep={cep} onCepChange={setCep} onCalculate={calc} status={status} quotes={shippingQuotes} freeShipping={free}
                  error={status === "error" ? "Informe um CEP válido com 8 números." : undefined} selectedId={sel} onSelect={setSel} />
              </div>
              <OrderSummary subtotal={subtotal} shipping={shipping} total={total} footer={<div className="hidden md:block">{checkout}</div>} />
            </div>
          </div>
        )}
      </div>
      {items.length > 0 && (
        <StickyActionBar>
          <div className="shrink-0"><p className="text-xs text-taupe">Total</p><p className="font-serif text-xl">{formatPrice(total)}</p></div>
          {checkout}
        </StickyActionBar>
      )}
    </StoreLayout>
  );
}
