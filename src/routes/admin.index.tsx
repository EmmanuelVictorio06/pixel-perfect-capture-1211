import { createFileRoute } from "@tanstack/react-router";
import { AdminHomePage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Painel — Serena Beauty" },
      { name: "description", content: "Resumo de vendas e pedidos." },
      { property: "og:title", content: "Painel — Serena Beauty" },
      { property: "og:description", content: "Resumo de vendas e pedidos." },
    ],
  }),
  component: AdminHomePage,
});
