import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@/pages/AuthPages";

export const Route = createFileRoute("/esqueci-senha")({
  head: () => ({
    meta: [
      { title: "Esqueci minha senha — Serena Beauty" },
      { name: "description", content: "Receba um link para redefinir sua senha." },
      { property: "og:title", content: "Esqueci minha senha — Serena Beauty" },
      { property: "og:description", content: "Receba um link para redefinir sua senha." },
    ],
  }),
  component: ForgotPasswordPage,
});
