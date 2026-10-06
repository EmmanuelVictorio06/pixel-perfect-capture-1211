import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/pages/AccountPages";

export const Route = createFileRoute("/conta/pedidos/")({
  head: () => ({
    meta: [
      { title: "Meus pedidos — Serena Beauty" },
      { name: "description", content: "Acompanhe seus pedidos." },
      { property: "og:title", content: "Meus pedidos — Serena Beauty" },
      { property: "og:description", content: "Acompanhe seus pedidos." },
    ],
  }),
  component: OrdersPage,
});
