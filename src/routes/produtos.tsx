import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/pages/CatalogPage";

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos — Serena Beauty" },
      { name: "description", content: "Catálogo completo de skincare coreano com filtros por marca, categoria e tipo de pele." },
      { property: "og:title", content: "Produtos — Serena Beauty" },
      { property: "og:description", content: "Catálogo completo de skincare coreano com filtros por marca, categoria e tipo de pele." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === "string" ? s.q : undefined,
    categoria: typeof s.categoria === "string" ? s.categoria : undefined,
    pele: typeof s.pele === "string" ? s.pele : undefined,
  }),
  component: Catalog,
});

function Catalog() {
  const { q, categoria, pele } = Route.useSearch();
  return <CatalogPage key={`${q}-${categoria}-${pele}`} initialQuery={q} initialCategory={categoria} initialSkin={pele} />;
}
