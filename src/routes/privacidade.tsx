import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/AppLink";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — Serena Beauty" },
      { name: "description", content: "Como a Serena Beauty trata seus dados pessoais." },
      { property: "og:title", content: "Política de privacidade — Serena Beauty" },
      { property: "og:description", content: "Como a Serena Beauty trata seus dados pessoais." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="container-page max-w-2xl space-y-4 py-12">
      <AppLink href="/" className="text-sm text-taupe hover:text-rose">← Voltar à loja</AppLink>
      <h1 className="text-4xl">Política de privacidade</h1>
      <p className="text-taupe">Texto de exemplo. Usamos seus dados apenas para processar pedidos, emitir nota fiscal e realizar entregas no estado de São Paulo.</p>
    </main>
  );
}
