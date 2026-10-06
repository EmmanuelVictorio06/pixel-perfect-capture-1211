import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skincare coreano original — Serena Beauty" },
      { name: "description", content: "Skincare coreano original com entrega em todo o estado de São Paulo. Anua, COSRX, Beauty of Joseon e mais." },
      { property: "og:title", content: "Skincare coreano original — Serena Beauty" },
      { property: "og:description", content: "Skincare coreano original com entrega em todo o estado de São Paulo. Anua, COSRX, Beauty of Joseon e mais." },
    ],
  }),
  component: HomePage,
});
