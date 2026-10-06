import { createFileRoute } from "@tanstack/react-router";
import { AdminOrdersPage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/pedidos/")({
  head: () => ({
    meta: [
      { title: "Pedidos (admin) — Serena Beauty" },
      { name: "description", content: "Gerencie os pedidos da loja." },
      { property: "og:title", content: "Pedidos (admin) — Serena Beauty" },
      { property: "og:description", content: "Gerencie os pedidos da loja." },
    ],
  }),
  component: AdminOrdersPage,
});
