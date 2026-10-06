import { Skeleton } from "@/components/ui/skeleton";
import type { ProductCard as ProductCardData } from "@/mocks/types";
import { AppLink } from "./AppLink";
import { DiscountBadge, Price } from "./Price";

export function ProductCard({ product }: { product: ProductCardData }) {
  const p = product;
  return (
    <AppLink href={`/produto/${p.slug}`} className="group flex flex-col rounded-2xl bg-card p-2 shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        {p.imagem && (
          <img src={p.imagem.path} alt={p.imagem.alt} loading="lazy" width={816} height={816}
            className={`size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] ${p.disponivel ? "" : "opacity-60 grayscale-[30%]"}`} />
        )}
        <div className="absolute left-2 top-2 flex gap-1">
          {p.disponivel ? (
            <DiscountBadge preco={p.preco} precoPromocional={p.precoPromocional} />
          ) : (
            <span className="rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-primary-foreground">Esgotado</span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 px-1.5 pb-2 pt-3">
        <span className="eyebrow">{p.marca}</span>
        <h3 className="line-clamp-2 font-sans text-sm font-normal leading-snug text-ink">
          {p.nome}
          {p.volume && <span className="text-taupe"> · {p.volume}</span>}
        </h3>
        <Price preco={p.preco} precoPromocional={p.precoPromocional} className="mt-auto pt-1" />
      </div>
    </AppLink>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card p-2 shadow-soft" aria-hidden="true">
      <Skeleton className="aspect-square rounded-xl bg-muted" />
      <div className="space-y-2 px-1.5 pb-2 pt-3">
        <Skeleton className="h-3 w-1/3 bg-muted" />
        <Skeleton className="h-4 w-full bg-muted" />
        <Skeleton className="h-4 w-1/2 bg-muted" />
      </div>
    </div>
  );
}

export function ProductGrid({ products, loading }: { products: ProductCardData[]; loading?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4" aria-busy={loading}>
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
        : products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
