import { useRouterState } from "@tanstack/react-router";
import { Home, Package, ReceiptText, Tags, TicketPercent } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppLink } from "./AppLink";
import { Logo } from "./Logo";

const nav = [
  { href: "/admin", label: "Início", icon: Home },
  { href: "/admin/pedidos", label: "Pedidos", icon: ReceiptText },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/catalogo", label: "Marcas e categorias", short: "Catálogo", icon: Tags },
  { href: "/admin/cupons", label: "Cupons", icon: TicketPercent },
];

export function AdminLayout({ title, actions, children }: { title: string; actions?: ReactNode; children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (h: string) => (h === "/admin" ? path === h : path.startsWith(h));
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-card p-5 lg:flex">
        <Logo href="/admin" />
        <p className="eyebrow mt-1 pl-10">Painel</p>
        <nav aria-label="Painel" className="mt-8 flex flex-col gap-1">
          {nav.map(({ href, label, icon: I }) => (
            <AppLink key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
              className={cn("flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm", isActive(href) ? "bg-secondary text-rose-dark" : "text-ink hover:bg-muted")}>
              <I className="size-4" aria-hidden="true" /> {label}
            </AppLink>
          ))}
        </nav>
        <AppLink href="/" className="mt-auto min-h-11 content-center text-sm text-taupe hover:text-rose">← Ver loja</AppLink>
      </aside>
      <div className="min-w-0 pb-24 lg:pb-0">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur md:px-8">
          <h1 className="text-2xl md:text-3xl">{title}</h1>
          <div className="flex gap-2">{actions}</div>
        </header>
        <main className="p-4 md:p-8">{children}</main>
      </div>
      <nav aria-label="Painel" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] lg:hidden">
        {nav.map(({ href, label, short, icon: I }) => (
          <AppLink key={href} href={href} aria-current={isActive(href) ? "page" : undefined}
            className={cn("flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem]", isActive(href) ? "text-rose" : "text-taupe")}>
            <I className="size-5" aria-hidden="true" /> {short ?? label}
          </AppLink>
        ))}
      </nav>
    </div>
  );
}

export function StatCard({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "alert" }) {
  return (
    <div className={cn("rounded-2xl bg-card p-5 shadow-soft", tone === "alert" && "ring-1 ring-rose/30")}>
      <p className="eyebrow">{label}</p>
      <p className={cn("mt-2 font-serif text-4xl", tone === "alert" && "text-rose")}>{value}</p>
      {hint && <p className="mt-1 text-xs text-taupe">{hint}</p>}
    </div>
  );
}
