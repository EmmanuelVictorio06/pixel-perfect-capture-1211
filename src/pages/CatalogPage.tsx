import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ActiveFilterChips, CatalogFilters, type FilterState } from "@/components/CatalogFilters";
import { ProductGrid } from "@/components/ProductCard";
import { StoreLayout } from "@/components/StoreLayout";
import { EmptyState } from "@/components/States";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { brands, categories, productDetails, products, skinTypes } from "@/mocks/catalog";
import { useStoreShell } from "./useStoreShell";

const PRICE_MAX = 20000;
const empty: FilterState = { marcas: [], categorias: [], peles: [], preco: [0, PRICE_MAX] };

export function CatalogPage({ initialQuery = "", initialCategory, initialSkin }: { initialQuery?: string; initialCategory?: string; initialSkin?: string }) {
  const { shell } = useStoreShell();
  const [q, setQ] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>({ ...empty, categorias: initialCategory ? [initialCategory] : [], peles: initialSkin ? [initialSkin] : [] });
  const [sort, setSort] = useState("relevancia");
  const [sheet, setSheet] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 600); return () => clearTimeout(t); }, []);

  const opts = {
    brands: brands.map((b) => ({ value: b.slug, label: b.nome })),
    categories: categories.map((c) => ({ value: c.slug, label: c.nome })),
    skinTypes: skinTypes.map((s) => ({ value: s.value, label: s.label })),
  };

  const list = useMemo(() => {
    const r = products.filter((p) => {
      const d = productDetails[p.slug];
      const price = p.precoPromocional ?? p.preco;
      return (!q || `${p.nome} ${p.marca}`.toLowerCase().includes(q.toLowerCase()))
        && (!filters.marcas.length || filters.marcas.includes(d.marcaSlug))
        && (!filters.categorias.length || filters.categorias.includes(d.categoria.slug))
        && (!filters.peles.length || d.tiposPele.some((t) => filters.peles.includes(t)))
        && price >= filters.preco[0] && price <= filters.preco[1];
    });
    const price = (p: (typeof r)[number]) => p.precoPromocional ?? p.preco;
    if (sort === "menor") r.sort((a, b) => price(a) - price(b));
    if (sort === "maior") r.sort((a, b) => price(b) - price(a));
    if (sort === "az") r.sort((a, b) => a.nome.localeCompare(b.nome));
    return r;
  }, [q, filters, sort]);

  const lbl = (arr: { value: string; label: string }[], v: string) => arr.find((o) => o.value === v)?.label ?? v;
  const chips = [
    ...filters.categorias.map((v) => ({ key: `c:${v}`, label: lbl(opts.categories, v) })),
    ...filters.marcas.map((v) => ({ key: `m:${v}`, label: lbl(opts.brands, v) })),
    ...filters.peles.map((v) => ({ key: `p:${v}`, label: `Pele ${lbl(opts.skinTypes, v).toLowerCase()}` })),
    ...(filters.preco[0] > 0 || filters.preco[1] < PRICE_MAX ? [{ key: "preco", label: "Faixa de preço" }] : []),
  ];
  const removeChip = (key: string) => {
    const [t, v] = key.split(":");
    if (key === "preco") return setFilters({ ...filters, preco: [0, PRICE_MAX] });
    const k = t === "c" ? "categorias" : t === "m" ? "marcas" : "peles";
    setFilters({ ...filters, [k]: filters[k].filter((x) => x !== v) });
  };
  const filterUi = <CatalogFilters value={filters} onChange={setFilters} priceMax={PRICE_MAX} {...opts} />;

  return (
    <StoreLayout {...shell}>
      <div className="container-page py-8">
        <p className="eyebrow">Loja</p>
        <h1 className="text-4xl md:text-5xl">Todos os produtos</h1>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="cat-q" className="sr-only">Buscar no catálogo</label>
          <input id="cat-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar no catálogo"
            className="h-12 flex-1 rounded-full border border-input bg-card px-5 text-base focus-visible:border-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/25" />
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 lg:hidden" onClick={() => setSheet(true)}>
              <SlidersHorizontal /> Filtros{chips.length ? ` (${chips.length})` : ""}
            </Button>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger aria-label="Ordenar por" className="h-12 flex-1 rounded-full bg-card px-5 text-base sm:w-52"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="menor">Menor preço</SelectItem>
                <SelectItem value="maior">Maior preço</SelectItem>
                <SelectItem value="az">Nome (A–Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4"><ActiveFilterChips chips={chips} onRemove={removeChip} onClear={() => setFilters(empty)} /></div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[15rem_1fr]">
          <aside className="hidden lg:block" aria-label="Filtros">{filterUi}</aside>
          <div>
            <p className="mb-4 text-sm text-taupe" aria-live="polite">{loading ? "Carregando…" : `${list.length} produtos`}</p>
            {!loading && list.length === 0 ? (
              <EmptyState title="Nenhum produto encontrado" description="Tente remover alguns filtros ou buscar por outro termo."
                action={<Button variant="outline" onClick={() => { setFilters(empty); setQ(""); }}>Limpar filtros</Button>} />
            ) : (
              <ProductGrid products={list} loading={loading} />
            )}
            {!loading && list.length > 0 && (
              <Pagination className="mt-10">
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" aria-disabled className="min-h-11">Anterior</PaginationPrevious></PaginationItem>
                  <PaginationItem><PaginationLink href="#" isActive className="size-11">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink href="#" className="size-11">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" className="min-h-11">Próxima</PaginationNext></PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>

      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent side="bottom" className="flex max-h-[88vh] flex-col rounded-t-3xl bg-background">
          <SheetHeader><SheetTitle className="font-serif text-2xl">Filtros</SheetTitle><SheetDescription className="sr-only">Refine os produtos</SheetDescription></SheetHeader>
          <div className="flex-1 overflow-y-auto py-2">{filterUi}</div>
          <SheetFooter className="flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setFilters(empty)}>Limpar</Button>
            <Button className="flex-1" onClick={() => setSheet(false)}>Ver {list.length} produtos</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </StoreLayout>
  );
}
