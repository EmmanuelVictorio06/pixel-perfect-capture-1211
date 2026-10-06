import { createFileRoute } from "@tanstack/react-router";
import { AdminProductFormPage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/produtos/novo")({
  head: () => ({
    meta: [
      { title: "Editar produto — Serena Beauty" },
      { name: "description", content: "Cadastro e edição de produto." },
      { property: "og:title", content: "Editar produto — Serena Beauty" },
      { property: "og:description", content: "Cadastro e edição de produto." },
    ],
  }),
  component: AdminProductFormPage,
});
