import { createFileRoute } from "@tanstack/react-router";
import { ConfirmEmailPage } from "@/pages/AuthPages";

export const Route = createFileRoute("/confirme-email")({
  head: () => ({
    meta: [
      { title: "Confirme seu e-mail — Serena Beauty" },
      { name: "description", content: "Confirme seu e-mail para ativar a conta." },
      { property: "og:title", content: "Confirme seu e-mail — Serena Beauty" },
      { property: "og:description", content: "Confirme seu e-mail para ativar a conta." },
    ],
  }),
  component: ConfirmEmailPage,
});
