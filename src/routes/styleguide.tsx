import { createFileRoute } from "@tanstack/react-router";
import { StyleguidePage } from "@/pages/StyleguidePage";

export const Route = createFileRoute("/styleguide")({
  head: () => ({
    meta: [
      { title: "Guia de estilo — Serena Beauty" },
      { name: "description", content: "Cores, tipografia e componentes da Serena Beauty." },
      { property: "og:title", content: "Guia de estilo — Serena Beauty" },
      { property: "og:description", content: "Cores, tipografia e componentes da Serena Beauty." },
    ],
  }),
  component: StyleguidePage,
});
