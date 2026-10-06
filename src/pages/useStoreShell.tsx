import { useRouter } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { StoreLayout } from "@/components/StoreLayout";
import { categories, products } from "@/mocks/catalog";
import { cartItems as initialCart, FREE_SHIPPING_THRESHOLD } from "@/mocks/commerce";
import type { CartItemView } from "@/mocks/types";

/** Estado de demonstração (mock) compartilhado pelas telas da loja. Substitua pela lógica real. */
export function useStoreShell() {
  const router = useRouter();
  const [items, setItems] = useState<CartItemView[]>(initialCart);
  const [cartOpen, setCartOpen] = useState(false);

  const changeQty = (id: string, q: number) =>
    setItems((s) => s.map((i) => (i.productId === id ? { ...i, quantidade: q, subtotal: q * i.precoUnitario } : i)));
  const remove = (id: string) => setItems((s) => s.filter((i) => i.productId !== id));
  const add = (productId: string, qtd = 1) => {
    const p = products.find((x) => x.id === productId)!;
    setItems((s) => {
      const ex = s.find((i) => i.productId === productId);
      if (ex) return s.map((i) => (i === ex ? { ...i, quantidade: i.quantidade + qtd, subtotal: (i.quantidade + qtd) * i.precoUnitario } : i));
      const unit = p.precoPromocional ?? p.preco;
      return [...s, { productId, nome: p.nome, slug: p.slug, marca: p.marca, volume: p.volume, imagem: p.imagem?.path ?? null,
        precoUnitario: unit, precoOriginal: p.preco, quantidade: qtd, subtotal: unit * qtd, disponivel: p.disponivel }];
    });
    setCartOpen(true);
  };

  const Shell = ({ children }: { children: ReactNode }) => (
    <StoreLayout cartItems={items} cartOpen={cartOpen} onCartOpenChange={setCartOpen} isLoggedIn categories={categories}
      freeShippingThreshold={FREE_SHIPPING_THRESHOLD} onSearch={(q) => router.navigate({ href: `/produtos?q=${encodeURIComponent(q)}` })}
      onChangeQuantity={changeQty} onRemove={remove}>
      {children}
    </StoreLayout>
  );
  return { Shell, items, add, changeQty, remove };
}
