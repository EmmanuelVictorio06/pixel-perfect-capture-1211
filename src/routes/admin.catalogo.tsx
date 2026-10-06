import { createFileRoute } from "@tanstack/react-router";
import { AdminCatalogPage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/catalogo")({
  head: () => ({
    meta: [
      { title: "Marcas e categorias — Serena Beauty" },
      { name: "description", content: "Gerencie marcas e categorias." },
      { property: "og:title", content: "Marcas e categorias — Serena Beauty" },
      { property: "og:description", content: "Gerencie marcas e categorias." },
    ],
  }),
  component: AdminCatalogPage,
});
