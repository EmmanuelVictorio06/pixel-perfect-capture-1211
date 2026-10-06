import { createFileRoute } from "@tanstack/react-router";
import { OrderDetailPage } from "@/pages/AccountPages";

export const Route = createFileRoute("/conta/pedidos/$id")({
  head: () => ({
    meta: [
      { title: "Detalhe do pedido — Serena Beauty" },
      { name: "description", content: "Status, itens e rastreio do seu pedido." },
      { property: "og:title", content: "Detalhe do pedido — Serena Beauty" },
      { property: "og:description", content: "Status, itens e rastreio do seu pedido." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  return <OrderDetailPage id={id} />;
}
