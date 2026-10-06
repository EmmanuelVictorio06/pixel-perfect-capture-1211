import type { ReactNode } from "react";
import { ChevronRight, ImagePlus, Plus, Printer, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState, type DragEvent } from "react";
import { AdminLayout, StatCard } from "@/components/AdminLayout";
import { AppLink } from "@/components/AppLink";
import { FormField } from "@/components/FormField";
import { OrderStatusBadge } from "@/components/OrderTimeline";
import { InlineAlert } from "@/components/States";
import { StickyActionBar } from "@/components/StickyActionBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { adminBrands, adminCategories, adminProducts, adminStats, coupons } from "@/mocks/admin";
import { brands, categories, skinTypes } from "@/mocks/catalog";
import { getOrder, orders, statusFlow, statusLabels } from "@/mocks/commerce";
import type { OrderStatus } from "@/mocks/types";
import { OrderDetailBody } from "./AccountPages";

export function AdminHomePage() {
  const s = adminStats;
  return (
    <AdminLayout title="Início">
      <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard label="Vendas hoje" value={formatPrice(s.vendasDia)} hint={`${s.pedidosDia} pedidos`} />
        <StatCard label="Vendas no mês" value={formatPrice(s.vendasMes)} hint={`${s.pedidosMes} pedidos`} />
        <StatCard label="Aguardando envio" value={String(s.aguardandoEnvio)} tone="alert" />
        <StatCard label="Sem estoque" value={String(s.semEstoque)} hint="produtos" tone="alert" />
      </div>
      <section className="mt-8">
        <h2 className="mb-3 text-2xl">Pedidos recentes</h2>
        <OrderList list={orders.slice(2, 5)} />
      </section>
    </AdminLayout>
  );
}

function OrderList({ list }: { list: typeof orders }) {
  return (
    <ul className="divide-y divide-border rounded-2xl bg-card shadow-soft">
      {list.map((o) => (
        <li key={o.id}>
          <AppLink href={`/admin/pedidos/${o.id}`} className="flex min-h-16 items-center gap-3 px-4 py-3 hover:bg-muted/50">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{o.numero} · {o.cliente}</p>
              <p className="text-xs text-taupe">{formatDate(o.criadoEm)} · {formatPrice(o.total)}</p>
            </div>
            <OrderStatusBadge status={o.status} />
            <ChevronRight className="size-4 text-taupe" aria-hidden="true" />
          </AppLink>
        </li>
      ))}
    </ul>
  );
}

export function AdminOrdersPage() {
  const [status, setStatus] = useState("todos");
  const [date, setDate] = useState("");
  const list = orders.filter((o) => (status === "todos" || o.status === status) && (!date || o.criadoEm.startsWith(date)));
  return (
    <AdminLayout title="Pedidos">
      <div className="mb-4 grid gap-3 sm:grid-cols-2 md:max-w-xl">
        <div className="space-y-1.5">
          <Label htmlFor="f-status" className="font-normal">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="f-status" className="h-12 rounded-xl bg-card text-base"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {Object.entries(statusLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <FormField label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      {list.length ? <OrderList list={list} /> : <InlineAlert>Nenhum pedido com esses filtros.</InlineAlert>}
    </AdminLayout>
  );
}

export function AdminOrderDetailPage({ id }: { id: string }) {
  const o = getOrder(id);
  const [st, setSt] = useState<OrderStatus>(o.status);
  return (
    <AdminLayout title={o.numero} actions={<Button variant="outline" size="sm"><Printer /> <span className="hidden sm:inline">Gerar etiqueta</span></Button>}>
      <div className="mb-6 rounded-2xl bg-card p-5 shadow-soft">
        <p className="mb-3 text-sm text-taupe">Cliente: <strong className="text-ink">{o.cliente}</strong> · Status atual: <OrderStatusBadge status={st} /></p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Alterar status">
          {[...statusFlow, "cancelado" as const].map((s) => (
            <Button key={s} size="sm" variant={s === st ? "default" : "soft"} onClick={() => setSt(s)} aria-pressed={s === st}>{statusLabels[s]}</Button>
          ))}
        </div>
      </div>
      <OrderDetailBody id={id} />
    </AdminLayout>
  );
}

export function AdminProductsPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => adminProducts.filter((p) => `${p.nome} ${p.sku}`.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <AdminLayout title="Produtos" actions={<Button asChild size="sm"><AppLink href="/admin/produtos/novo"><Plus /> Novo</AppLink></Button>}>
      <div className="relative mb-4 md:max-w-md">
        <Label htmlFor="ap-q" className="sr-only">Buscar produtos</Label>
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-taupe" aria-hidden="true" />
        <Input id="ap-q" type="search" placeholder="Buscar por nome ou SKU" value={q} onChange={(e) => setQ(e.target.value)} className="pl-10" />
      </div>
      <ul className="divide-y divide-border rounded-2xl bg-card shadow-soft">
        {list.map((p) => (
          <li key={p.id}>
            <AppLink href="/admin/produtos/novo" className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50">
              {p.imagem && <img src={p.imagem.path} alt="" className="size-14 rounded-lg object-cover" loading="lazy" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.nome}</p>
                <p className="text-xs text-taupe">{p.sku} · {formatPrice(p.precoPromocional ?? p.preco)}</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-right">
                <span className={cn("text-sm", p.estoque - p.reservado <= 0 ? "text-destructive" : "text-ink")}>{p.estoque - p.reservado} disp.</span>
                {p.oculto && <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-taupe">Oculto</span>}
              </div>
            </AppLink>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-soft">
      <h2 className="mb-4 text-2xl">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function SelectField({ label, options, id }: { label: string; id: string; options: { value: string; label: string }[] }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="font-normal">{label}</Label>
      <Select defaultValue={options[0].value}>
        <SelectTrigger id={id} className="h-12 rounded-xl bg-card text-base"><SelectValue /></SelectTrigger>
        <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  );
}

function TextArea({ label, id }: { label: string; id: string }) {
  return (
    <div className="space-y-1.5 sm:col-span-2">
      <Label htmlFor={id} className="font-normal">{label}</Label>
      <Textarea id={id} rows={4} className="rounded-xl bg-card text-base" />
    </div>
  );
}

export function AdminProductFormPage() {
  const base = adminProducts[0];
  const [photos, setPhotos] = useState(adminProducts.slice(0, 3).map((p, i) => ({ id: String(i), src: p.imagem!.path })));
  const [cover, setCover] = useState("0");
  const [drag, setDrag] = useState(false);
  const [visible, setVisible] = useState(true);
  const onDrop = (e: DragEvent) => {
    e.preventDefault(); setDrag(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    setPhotos((p) => [...p, ...files.map((f, i) => ({ id: `${Date.now()}${i}`, src: URL.createObjectURL(f) }))]);
  };
  const save = <Button size="lg" className="flex-1 md:flex-none">Salvar</Button>;
  return (
    <AdminLayout title="Produto" actions={<div className="hidden md:block">{save}</div>}>
      <div className="mx-auto max-w-3xl space-y-5">
        <FormSection title="Identificação">
          <FormField className="sm:col-span-2" label="Nome" defaultValue={base.nome} />
          <FormField label="SKU" defaultValue={base.sku} />
          <FormField label="Slug" defaultValue={base.slug} />
          <SelectField id="marca" label="Marca" options={brands.map((b) => ({ value: b.slug, label: b.nome }))} />
          <SelectField id="categoria" label="Categoria" options={categories.map((c) => ({ value: c.slug, label: c.nome }))} />
          <FormField label="Volume" defaultValue={base.volume ?? ""} />
        </FormSection>
        <FormSection title="Preço">
          <FormField label="Preço normal (R$)" inputMode="decimal" defaultValue="149,90" />
          <FormField label="Preço promocional (R$)" inputMode="decimal" defaultValue="114,90" hint="Deixe em branco se não houver promoção." />
        </FormSection>
        <FormSection title="Peso e medidas da embalagem">
          <FormField label="Peso (g)" inputMode="numeric" defaultValue="320" />
          <FormField label="Altura (cm)" inputMode="numeric" defaultValue="18" />
          <FormField label="Largura (cm)" inputMode="numeric" defaultValue="6" />
          <FormField label="Comprimento (cm)" inputMode="numeric" defaultValue="6" />
        </FormSection>
        <FormSection title="Detalhes">
          <TextArea id="desc" label="Descrição" />
          <TextArea id="uso" label="Modo de uso" />
          <TextArea id="ing" label="Ingredientes" />
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-sm">Tipos de pele</legend>
            <div className="flex flex-wrap gap-x-5">
              {skinTypes.map((s) => <label key={s.value} className="flex min-h-11 items-center gap-2 text-sm"><Checkbox className="size-5" defaultChecked={s.value === "oleosa"} />{s.label}</label>)}
            </div>
          </fieldset>
          <label className="flex min-h-11 items-center justify-between gap-3 sm:col-span-2">
            <span>Visível na loja</span><Switch checked={visible} onCheckedChange={setVisible} />
          </label>
        </FormSection>
        <section className="rounded-2xl bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-2xl">Fotos</h2>
          <label onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={onDrop}
            className={cn("flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed text-sm text-taupe", drag ? "border-rose bg-secondary" : "border-border")}>
            <ImagePlus className="size-6 text-rose" aria-hidden="true" />
            Arraste fotos aqui ou toque para escolher
            <input type="file" accept="image/*" multiple className="sr-only"
              onChange={(e) => setPhotos((p) => [...p, ...Array.from(e.target.files ?? []).map((f, i) => ({ id: `${Date.now()}${i}`, src: URL.createObjectURL(f) }))])} />
          </label>
          <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {photos.map((ph) => (
              <li key={ph.id} className={cn("relative overflow-hidden rounded-xl", cover === ph.id && "ring-2 ring-rose")}>
                <img src={ph.src} alt="" className="aspect-square w-full object-cover" />
                {cover === ph.id && <span className="absolute left-1 top-1 rounded-full bg-rose px-2 py-0.5 text-[0.65rem] text-primary-foreground">Capa</span>}
                <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/50 p-0.5">
                  <button type="button" aria-label="Definir como capa" onClick={() => setCover(ph.id)} className="grid size-11 place-items-center text-primary-foreground"><Star className="size-4" /></button>
                  <button type="button" aria-label="Remover foto" onClick={() => setPhotos((p) => p.filter((x) => x.id !== ph.id))} className="grid size-11 place-items-center text-primary-foreground"><Trash2 className="size-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-card p-5 shadow-soft">
          <h2 className="mb-4 text-2xl">Estoque</h2>
          <dl className="grid grid-cols-3 gap-3 text-center">
            {[["Em estoque", base.estoque], ["Reservado", base.reservado], ["Disponível", base.estoque - base.reservado]].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-muted p-3"><dt className="text-xs text-taupe">{l}</dt><dd className="font-serif text-3xl">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-4 grid gap-4 sm:grid-cols-[8rem_1fr_auto] sm:items-end">
            <FormField label="Ajuste (+/−)" inputMode="numeric" placeholder="+10" />
            <SelectField id="motivo" label="Motivo" options={[{ value: "entrada", label: "Entrada de mercadoria" }, { value: "avaria", label: "Avaria" }, { value: "inventario", label: "Correção de inventário" }]} />
            <Button variant="outline">Ajustar</Button>
          </div>
        </section>
      </div>
      <StickyActionBar className="bottom-16">{save}</StickyActionBar>
    </AdminLayout>
  );
}

function ToggleList({ title, items }: { title: string; items: { id: string; nome: string; visivel: boolean; produtos: number }[] }) {
  const [list, setList] = useState(items);
  const [novo, setNovo] = useState("");
  return (
    <section className="rounded-2xl bg-card p-5 shadow-soft">
      <h2 className="mb-4 text-2xl">{title}</h2>
      <form className="mb-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (novo.trim()) { setList([...list, { id: novo, nome: novo, visivel: true, produtos: 0 }]); setNovo(""); } }}>
        <Label htmlFor={`novo-${title}`} className="sr-only">Adicionar {title.toLowerCase()}</Label>
        <Input id={`novo-${title}`} placeholder="Nome" value={novo} onChange={(e) => setNovo(e.target.value)} />
        <Button type="submit" aria-label={`Adicionar em ${title}`} size="icon" className="size-12 shrink-0"><Plus /></Button>
      </form>
      <ul className="divide-y divide-border">
        {list.map((i) => (
          <li key={i.id} className="flex min-h-14 items-center gap-3">
            <span className={cn("flex-1 text-sm", !i.visivel && "text-taupe line-through")}>{i.nome}</span>
            <span className="text-xs text-taupe">{i.produtos} produtos</span>
            <Switch aria-label={`${i.visivel ? "Ocultar" : "Mostrar"} ${i.nome}`} checked={i.visivel} onCheckedChange={(v) => setList(list.map((x) => (x.id === i.id ? { ...x, visivel: v } : x)))} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AdminCatalogPage() {
  return (
    <AdminLayout title="Marcas e categorias">
      <div className="grid gap-5 lg:grid-cols-2">
        <ToggleList title="Marcas" items={adminBrands} />
        <ToggleList title="Categorias" items={adminCategories} />
      </div>
    </AdminLayout>
  );
}

export function AdminCouponsPage() {
  return (
    <AdminLayout title="Cupons" actions={<Button size="sm"><Plus /> Novo</Button>}>
      <ul className="divide-y divide-border rounded-2xl bg-card shadow-soft">
        {coupons.map((c) => (
          <li key={c.id} className="flex min-h-16 items-center gap-3 px-4 py-3">
            <div className="flex-1"><p className="font-mono text-sm font-medium tracking-wider">{c.codigo}</p><p className="text-xs text-taupe">{c.descricao} · {c.usos} usos</p></div>
            <Switch aria-label={`Ativar ${c.codigo}`} defaultChecked={c.ativo} />
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
}
