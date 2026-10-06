import { ChevronRight, KeyRound, LogOut, MapPin, Package, Plus, UserRound } from "lucide-react";
import { useState } from "react";
import { AddressCard } from "@/components/AddressCard";
import { AddressForm, type AddressDraft } from "@/components/AddressForm";
import { AppLink } from "@/components/AppLink";
import { OrderStatusBadge, OrderTimeline } from "@/components/OrderTimeline";
import { StoreLayout } from "@/components/StoreLayout";
import { EmptyState } from "@/components/States";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/format";
import { addresses, currentUser, getOrder, orders } from "@/mocks/commerce";
import { useStoreShell } from "./useStoreShell";

function AccountShell({ title, back, children }: { title: string; back?: string; children: React.ReactNode }) {
  const { shell } = useStoreShell();
  return (
    <StoreLayout {...shell}>
      <div className="container-page max-w-3xl py-8">
        {back && <AppLink href={back} className="mb-2 inline-flex min-h-11 items-center text-sm text-taupe hover:text-rose">← Voltar</AppLink>}
        <h1 className="mb-6 text-4xl">{title}</h1>
        {children}
      </div>
    </StoreLayout>
  );
}

const links = [
  { href: "/conta/pedidos", icon: Package, label: "Meus pedidos" },
  { href: "/conta/enderecos", icon: MapPin, label: "Endereços" },
  { href: "/conta", icon: UserRound, label: "Dados pessoais" },
  { href: "/nova-senha", icon: KeyRound, label: "Alterar senha" },
];

export function AccountPage() {
  return (
    <AccountShell title={`Olá, ${currentUser.nome}`}>
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map(({ href, icon: I, label }) => (
          <li key={label}>
            <AppLink href={href} className="flex min-h-16 items-center gap-4 rounded-2xl bg-card p-4 shadow-soft hover:shadow-lift">
              <span className="grid size-10 place-items-center rounded-full bg-secondary text-rose"><I className="size-5" aria-hidden="true" /></span>
              <span className="flex-1">{label}</span><ChevronRight className="size-4 text-taupe" aria-hidden="true" />
            </AppLink>
          </li>
        ))}
        <li><button type="button" className="flex min-h-16 w-full items-center gap-4 rounded-2xl border border-border p-4 text-left text-taupe hover:text-rose">
          <LogOut className="size-5" aria-hidden="true" /> Sair</button></li>
      </ul>
    </AccountShell>
  );
}

export function OrdersPage() {
  const mine = orders.filter((o) => o.cliente === "Mariana Alves");
  return (
    <AccountShell title="Meus pedidos" back="/conta">
      {mine.length === 0 ? <EmptyState icon={Package} title="Nenhum pedido ainda" /> : (
        <ul className="space-y-3">
          {mine.map((o) => (
            <li key={o.id}>
              <AppLink href={`/conta/pedidos/${o.id}`} className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-soft hover:shadow-lift">
                <div className="flex-1">
                  <p className="font-medium">{o.numero}</p>
                  <p className="text-sm text-taupe">{formatDate(o.criadoEm)} · {o.itens.length} {o.itens.length === 1 ? "item" : "itens"} · {formatPrice(o.total)}</p>
                </div>
                <OrderStatusBadge status={o.status} />
                <ChevronRight className="size-4 text-taupe" aria-hidden="true" />
              </AppLink>
            </li>
          ))}
        </ul>
      )}
    </AccountShell>
  );
}

export function OrderDetailBody({ id }: { id: string }) {
  const o = getOrder(id);
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_16rem]">
      <div className="space-y-6">
        <section className="rounded-2xl bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-2xl">Itens</h2>
          <ul className="divide-y divide-border">
            {o.itens.map((i) => (
              <li key={i.productId} className="flex items-center gap-3 py-3">
                {i.imagem && <img src={i.imagem} alt="" className="size-14 rounded-lg object-cover" loading="lazy" />}
                <span className="flex-1 text-sm">{i.nome} <span className="text-taupe">× {i.quantidade}</span></span>
                <span className="text-sm">{formatPrice(i.subtotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
            <div className="flex justify-between"><dt className="text-taupe">Frete ({o.envio.transportadora} · {o.envio.servicoNome})</dt><dd>{o.frete ? formatPrice(o.frete) : "Grátis"}</dd></div>
            <div className="flex justify-between text-base"><dt>Total</dt><dd className="font-serif text-xl">{formatPrice(o.total)}</dd></div>
          </dl>
        </section>
        <section><h2 className="mb-3 text-2xl">Entrega</h2><AddressCard address={o.endereco} /></section>
        {o.envio.rastreio && (
          <section className="rounded-2xl bg-card p-5 shadow-soft">
            <p className="eyebrow">Código de rastreio</p>
            <p className="mt-1 font-mono text-lg tracking-wider">{o.envio.rastreio}</p>
          </section>
        )}
      </div>
      <section className="rounded-2xl bg-card p-5 shadow-soft md:self-start">
        <h2 className="mb-4 text-2xl">Status</h2>
        <OrderTimeline status={o.status} />
      </section>
    </div>
  );
}

export function OrderDetailPage({ id }: { id: string }) {
  const o = getOrder(id);
  return <AccountShell title={`Pedido ${o.numero}`} back="/conta/pedidos"><OrderDetailBody id={id} /></AccountShell>;
}

const blank: AddressDraft = { apelido: "", destinatario: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "" };

export function AddressesPage() {
  const [form, setForm] = useState(false);
  const [draft, setDraft] = useState(blank);
  const [st, setSt] = useState<"idle" | "loading" | "ok" | "not_sp" | "not_found">("idle");
  const lookup = (cep: string) => {
    setSt("loading");
    setTimeout(() => {
      if (/^[01]/.test(cep)) { setDraft((d) => ({ ...d, cep, logradouro: "Avenida Brasil", bairro: "Jardim América", cidade: "São Paulo", uf: "SP" })); setSt("ok"); }
      else setSt(cep.startsWith("9") ? "not_found" : "not_sp");
    }, 600);
  };
  return (
    <AccountShell title="Endereços" back="/conta">
      <div className="space-y-3">
        {addresses.map((a) => (
          <AddressCard key={a.id} address={a} action={<Button variant="ghost" size="sm" aria-label={`Editar ${a.apelido}`}>Editar</Button>} />
        ))}
        {form ? (
          <div className="rounded-2xl bg-card p-5 shadow-soft">
            <h2 className="mb-4 text-2xl">Novo endereço</h2>
            <p className="mb-4 text-xs text-taupe">Dica: CEPs começando com 0 ou 1 são de SP neste protótipo.</p>
            <AddressForm value={draft} onChange={setDraft} onCepLookup={lookup} cepStatus={st} onSubmit={() => setForm(false)} />
          </div>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => setForm(true)}><Plus /> Adicionar endereço</Button>
        )}
      </div>
    </AccountShell>
  );
}
