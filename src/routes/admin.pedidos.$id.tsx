import { createFileRoute } from "@tanstack/react-router";
import { AdminOrderDetailPage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/pedidos/$id")({
  head: () => ({
    meta: [
      { title: "Pedido (admin) — Serena Beauty" },
      { name: "description", content: "Detalhe e status do pedido." },
      { property: "og:title", content: "Pedido (admin) — Serena Beauty" },
      { property: "og:description", content: "Detalhe e status do pedido." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  return <AdminOrderDetailPage id={id} />;
}
