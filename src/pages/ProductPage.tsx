import { useState } from "react";
import { AppLink } from "@/components/AppLink";
import { DiscountBadge, Price, StockBadge } from "@/components/Price";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { QuantitySelector } from "@/components/QuantitySelector";
import { SectionHeading } from "@/components/SectionHeading";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { StickyActionBar } from "@/components/StickyActionBar";
import { StoreLayout } from "@/components/StoreLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getProduct, products, skinTypes } from "@/mocks/catalog";
import { shippingQuotes } from "@/mocks/commerce";
import { useStoreShell } from "./useStoreShell";

export function ProductPage({ slug }: { slug: string }) {
  const { shell, add } = useStoreShell();
  const p = getProduct(slug);
  const [qtd, setQtd] = useState(1);
  const [cep, setCep] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const calc = () => {
    if (cep.length !== 9) return setStatus("error");
    setStatus("loading");
    setTimeout(() => setStatus("success"), 700);
  };
  const addBtn = (
    <Button size="lg" className="flex-1" disabled={!p.disponivel} onClick={() => add(p.id, qtd)}>
      {p.disponivel ? "Adicionar ao carrinho" : "Esgotado"}
    </Button>
  );

  return (
    <StoreLayout {...shell}>
      <div className="container-page py-6 md:py-10">
        <nav aria-label="Trilha" className="mb-4 text-xs text-taupe">
          <AppLink href="/" className="hover:text-rose">Início</AppLink> / <AppLink href={`/produtos?categoria=${p.categoria.slug}`} className="hover:text-rose">{p.categoria.nome}</AppLink>
        </nav>
        <div className="grid gap-8 md:grid-cols-2 lg:gap-14">
          <ProductGallery images={p.imagens} />
          <div className="md:sticky md:top-28 md:self-start">
            <p className="eyebrow">{p.marca}</p>
            <h1 className="mt-1 text-4xl leading-tight md:text-5xl">{p.nome}</h1>
            {p.volume && <p className="mt-1 text-taupe">{p.volume}</p>}
            <div className="mt-5 flex items-center gap-3">
              <Price preco={p.preco} precoPromocional={p.precoPromocional} size="lg" />
              <DiscountBadge preco={p.preco} precoPromocional={p.precoPromocional} />
            </div>
            <StockBadge disponivel={p.disponivel} className="mt-3" />
            <div className="mt-5">
              <p className="mb-2 text-sm text-taupe">Indicado para pele</p>
              <ul className="flex flex-wrap gap-2">
                {p.tiposPele.map((t) => <li key={t} className="rounded-full bg-petal/60 px-3 py-1.5 text-sm text-rose-dark">{skinTypes.find((s) => s.value === t)?.label}</li>)}
              </ul>
            </div>
            <div className="mt-6 hidden items-center gap-3 md:flex">
              <QuantitySelector value={qtd} onChange={setQtd} />
              {addBtn}
            </div>
            <div className="hairline my-8" />
            <ShippingCalculator cep={cep} onCepChange={setCep} onCalculate={calc} status={status}
              error={status === "error" ? "Informe um CEP válido com 8 números." : undefined} quotes={shippingQuotes} />
            <Accordion type="multiple" defaultValue={["descricao"]} className="mt-6">
              {[["descricao", "Descrição", p.descricao], ["uso", "Modo de uso", p.modoUso], ["ing", "Ingredientes", p.ingredientes]].map(([v, t, c]) =>
                c ? (
                  <AccordionItem key={v} value={v!}>
                    <AccordionTrigger className="min-h-12 font-serif text-xl hover:no-underline">{t}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-taupe">{c}</AccordionContent>
                  </AccordionItem>
                ) : null,
              )}
            </Accordion>
          </div>
        </div>
        <section className="mt-16">
          <SectionHeading title="Você também pode gostar" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {products.filter((x) => x.id !== p.id).slice(0, 4).map((x) => <ProductCard key={x.id} product={x} />)}
          </div>
        </section>
      </div>
      <StickyActionBar>
        {p.disponivel && <QuantitySelector value={qtd} onChange={setQtd} />}
        {addBtn}
      </StickyActionBar>
    </StoreLayout>
  );
}
