import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { CartDrawer } from "./CartDrawer";
import type { CartItemView } from "@/mocks/types";

type Props = {
  children: ReactNode;
  cartItems: CartItemView[];
  cartOpen: boolean;
  onCartOpenChange: (o: boolean) => void;
  isLoggedIn: boolean;
  categories: { nome: string; slug: string }[];
  freeShippingThreshold: number;
  onSearch: (q: string) => void;
  onChangeQuantity: (id: string, q: number) => void;
  onRemove: (id: string) => void;
};

export function StoreLayout(p: Props) {
  const count = p.cartItems.reduce((a, i) => a + i.quantidade, 0);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-full focus:bg-card focus:px-4 focus:py-2">Pular para o conteúdo</a>
      <Header cartCount={count} isLoggedIn={p.isLoggedIn} categories={p.categories} onOpenCart={() => p.onCartOpenChange(true)} onSearch={p.onSearch} />
      <main id="conteudo" className="flex-1">{p.children}</main>
      <Footer whatsappHref="https://wa.me/5516990000000" />
      <CartDrawer open={p.cartOpen} onOpenChange={p.onCartOpenChange} items={p.cartItems} freeShippingThreshold={p.freeShippingThreshold}
        onChangeQuantity={p.onChangeQuantity} onRemove={p.onRemove} />
    </div>
  );
}
