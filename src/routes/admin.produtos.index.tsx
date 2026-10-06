import { createFileRoute } from "@tanstack/react-router";
import { AdminProductsPage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/produtos/")({
  head: () => ({
    meta: [
      { title: "Produtos (admin) — Serena Beauty" },
      { name: "description", content: "Gerencie o catálogo de produtos." },
      { property: "og:title", content: "Produtos (admin) — Serena Beauty" },
      { property: "og:description", content: "Gerencie o catálogo de produtos." },
    ],
  }),
  component: AdminProductsPage,
});
