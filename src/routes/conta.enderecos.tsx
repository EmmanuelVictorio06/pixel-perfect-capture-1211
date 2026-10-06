import { createFileRoute } from "@tanstack/react-router";
import { AddressesPage } from "@/pages/AccountPages";

export const Route = createFileRoute("/conta/enderecos")({
  head: () => ({
    meta: [
      { title: "Endereços — Serena Beauty" },
      { name: "description", content: "Gerencie seus endereços de entrega em SP." },
      { property: "og:title", content: "Endereços — Serena Beauty" },
      { property: "og:description", content: "Gerencie seus endereços de entrega em SP." },
    ],
  }),
  component: AddressesPage,
});
