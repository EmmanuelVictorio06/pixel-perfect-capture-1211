import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/AuthPages";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Serena Beauty" },
      { name: "description", content: "Acesse sua conta Serena Beauty." },
      { property: "og:title", content: "Entrar — Serena Beauty" },
      { property: "og:description", content: "Acesse sua conta Serena Beauty." },
    ],
  }),
  component: LoginPage,
});
