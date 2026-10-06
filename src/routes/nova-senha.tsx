import { createFileRoute } from "@tanstack/react-router";
import { NewPasswordPage } from "@/pages/AuthPages";

export const Route = createFileRoute("/nova-senha")({
  head: () => ({
    meta: [
      { title: "Nova senha — Serena Beauty" },
      { name: "description", content: "Defina uma nova senha para sua conta." },
      { property: "og:title", content: "Nova senha — Serena Beauty" },
      { property: "og:description", content: "Defina uma nova senha para sua conta." },
    ],
  }),
  component: NewPasswordPage,
});
