import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/pages/AuthPages";

export const Route = createFileRoute("/criar-conta")({
  head: () => ({
    meta: [
      { title: "Criar conta — Serena Beauty" },
      { name: "description", content: "Crie sua conta e acompanhe seus pedidos." },
      { property: "og:title", content: "Criar conta — Serena Beauty" },
      { property: "og:description", content: "Crie sua conta e acompanhe seus pedidos." },
    ],
  }),
  component: SignupPage,
});
