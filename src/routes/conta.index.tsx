import { createFileRoute } from "@tanstack/react-router";
import { AccountPage } from "@/pages/AccountPages";

export const Route = createFileRoute("/conta/")({
  head: () => ({
    meta: [
      { title: "Minha conta — Serena Beauty" },
      { name: "description", content: "Pedidos, endereços e dados da sua conta." },
      { property: "og:title", content: "Minha conta — Serena Beauty" },
      { property: "og:description", content: "Pedidos, endereços e dados da sua conta." },
    ],
  }),
  component: AccountPage,
});
