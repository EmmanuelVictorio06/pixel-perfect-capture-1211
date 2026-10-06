import { createFileRoute } from "@tanstack/react-router";
import { AdminCouponsPage } from "@/pages/AdminPages";

export const Route = createFileRoute("/admin/cupons")({
  head: () => ({
    meta: [
      { title: "Cupons — Serena Beauty" },
      { name: "description", content: "Gerencie cupons de desconto." },
      { property: "og:title", content: "Cupons — Serena Beauty" },
      { property: "og:description", content: "Gerencie cupons de desconto." },
    ],
  }),
  component: AdminCouponsPage,
});
