import { ArrowRight, BadgeCheck, CreditCard, Gift, Truck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { AppLink } from "@/components/AppLink";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StoreLayout } from "@/components/StoreLayout";
import { Button } from "@/components/ui/button";
import { categories, products, skinTypes } from "@/mocks/catalog";
import { useStoreShell } from "./useStoreShell";

const benefits = [
  { icon: BadgeCheck, title: "Produtos originais", text: "Importados com procedência" },
  { icon: Truck, title: "Entrega em SP", text: "Envio a partir de Franca/SP" },
  { icon: CreditCard, title: "Pagamento seguro", text: "Pix, cartão ou boleto" },
  { icon: Gift, title: "Frete grátis", text: "Em compras acima de R$ 200" },
];

export function HomePage() {
  const { shell } = useStoreShell();
  return (
    <StoreLayout {...shell}>
      <section className="relative overflow-hidden">
        <img src={hero} alt="" width={1600} height={1008} className="absolute inset-0 size-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-blush via-blush/85 to-blush/10 md:via-blush/60" />
        <div className="container-page relative flex min-h-[26rem] flex-col justify-center py-14 md:min-h-[34rem]">
          <p className="eyebrow mb-3">Skincare coreano</p>
          <h1 className="max-w-md text-5xl leading-[1.05] text-ink md:text-7xl">Serena <span className="italic text-rose">Beauty</span></h1>
          <p className="mt-4 max-w-sm font-serif text-xl italic text-taupe md:text-2xl">Feita para realçar a beleza da sua pele.</p>
          <Button asChild size="lg" className="mt-8 w-fit"><AppLink href="/produtos">Ver produtos <ArrowRight /></AppLink></Button>
        </div>
      </section>

      <section className="container-page mt-12" aria-labelledby="cat-t">
        <SectionHeading eyebrow="Explore" title="Por categoria" />
        <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-7 md:px-0">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <AppLink href={`/produtos?categoria=${c.slug}`} className="flex h-24 w-28 flex-col items-center justify-center rounded-2xl border border-border bg-card text-center text-sm text-ink transition-colors hover:border-gold hover:text-rose md:w-full">
                <span className="mb-2 h-px w-6 bg-gold" aria-hidden="true" />{c.nome}
              </AppLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page mt-12">
        <SectionHeading eyebrow="Para você" title="Por tipo de pele" />
        <div className="flex flex-wrap gap-2">
          {skinTypes.map((s) => (
            <AppLink key={s.value} href={`/produtos?pele=${s.value}`} className="inline-flex min-h-11 items-center rounded-full bg-petal/60 px-5 text-sm text-rose-dark hover:bg-petal">
              Pele {s.label.toLowerCase()}
            </AppLink>
          ))}
        </div>
      </section>

      <section className="container-page mt-14">
        <SectionHeading eyebrow="Acabou de chegar" title="Novidades" action={<AppLink href="/produtos" className="min-h-11 content-center text-sm text-rose hover:underline">Ver tudo</AppLink>} />
        <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0" aria-label="Novidades">
          {products.slice(4, 10).map((p) => <li key={p.id} className="w-[44%] shrink-0 snap-start sm:w-[30%] lg:w-[23%]"><ProductCard product={p} /></li>)}
        </ul>
      </section>

      <section className="container-page mt-14">
        <SectionHeading eyebrow="Queridinhos" title="Mais vendidos" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-16 bg-card py-10" aria-label="Benefícios">
        <ul className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {benefits.map(({ icon: I, title, text }) => (
            <li key={title} className="flex flex-col items-center gap-2 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-secondary text-rose"><I className="size-5" aria-hidden="true" /></span>
              <p className="font-serif text-lg">{title}</p>
              <p className="text-xs text-taupe">{text}</p>
            </li>
          ))}
        </ul>
      </section>
    </StoreLayout>
  );
}
