import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/pages/ProductPage";

export const Route = createFileRoute("/produto/$slug")({
  head: () => ({
    meta: [
      { title: "Produto — Serena Beauty" },
      { name: "description", content: "Detalhes, modo de uso e ingredientes." },
      { property: "og:title", content: "Produto — Serena Beauty" },
      { property: "og:description", content: "Detalhes, modo de uso e ingredientes." },
    ],
  }),
  component: Product,
});

function Product() {
  const { slug } = Route.useParams();
  return <ProductPage key={slug} slug={slug} />;
}
