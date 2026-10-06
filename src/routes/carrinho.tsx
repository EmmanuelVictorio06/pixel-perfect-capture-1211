import { createFileRoute } from "@tanstack/react-router";
import { CartPage } from "@/pages/CartPage";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Serena Beauty" },
      { name: "description", content: "Revise os itens da sua sacola e calcule o frete." },
      { property: "og:title", content: "Carrinho — Serena Beauty" },
      { property: "og:description", content: "Revise os itens da sua sacola e calcule o frete." },
    ],
  }),
  component: CartPage,
});
