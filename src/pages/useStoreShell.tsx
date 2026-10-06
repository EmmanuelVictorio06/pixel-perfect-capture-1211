import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { categories, products } from "@/mocks/catalog";
import { cartItems as initialCart, FREE_SHIPPING_THRESHOLD } from "@/mocks/commerce";
import type { CartItemView } from "@/mocks/types";

/** Estado de demonstração (mock) usado pelas telas da loja. Substitua pela lógica real. */
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

  const shell = {
    cartItems: items, cartOpen, onCartOpenChange: setCartOpen, isLoggedIn: true, categories,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    onSearch: (q: string) => router.navigate({ href: `/produtos?q=${encodeURIComponent(q)}` }),
    onChangeQuantity: changeQty, onRemove: remove,
  };
  return { shell, items, add, changeQty, remove };
}
