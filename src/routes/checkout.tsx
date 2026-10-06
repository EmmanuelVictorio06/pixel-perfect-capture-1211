import { createFileRoute } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { CheckoutPage } from "@/pages/CheckoutPage";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar compra — Serena Beauty" },
      { name: "description", content: "Entrega, dados e pagamento." },
      { property: "og:title", content: "Finalizar compra — Serena Beauty" },
      { property: "og:description", content: "Entrega, dados e pagamento." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const router = useRouter();
  return <CheckoutPage onFinish={(m) => router.navigate({ href: `/pedido-confirmado?metodo=${m}` })} />;
}
