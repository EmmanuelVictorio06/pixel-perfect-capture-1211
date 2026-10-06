import { createFileRoute } from "@tanstack/react-router";
import { OrderConfirmedPage } from "@/pages/OrderConfirmedPage";

export const Route = createFileRoute("/pedido-confirmado")({
  head: () => ({
    meta: [
      { title: "Pedido confirmado — Serena Beauty" },
      { name: "description", content: "Seu pedido foi recebido." },
      { property: "og:title", content: "Pedido confirmado — Serena Beauty" },
      { property: "og:description", content: "Seu pedido foi recebido." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({ metodo: typeof s.metodo === "string" ? s.metodo : undefined }),
  component: Confirmed,
});

function Confirmed() {
  const { metodo } = Route.useSearch();
  return <OrderConfirmedPage metodo={metodo} />;
}
