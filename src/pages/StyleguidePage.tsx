import type { ReactNode } from "react";
import { useState } from "react";
import { FormField, PasswordField, PasswordStrength } from "@/components/FormField";
import { BlossomMark, Logo } from "@/components/Logo";
import { DiscountBadge, Price, StockBadge } from "@/components/Price";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { QuantitySelector } from "@/components/QuantitySelector";
import { EmptyState, ErrorState, InlineAlert, SuccessState } from "@/components/States";
import { Button } from "@/components/ui/button";
import { products } from "@/mocks/catalog";

const colors = [
  ["blush", "bg-blush", "#fbf4f3"], ["petal", "bg-petal", "#f3c6cc"], ["rose", "bg-rose", "#a8505d"],
  ["rose-dark", "bg-rose-dark", "#93404e"], ["ink", "bg-ink", "#2f2a2b"], ["taupe", "bg-taupe", "#6f615b"], ["gold", "bg-gold", "#c9a27a"],
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-4"><h2 className="border-b border-border pb-2 text-3xl">{title}</h2>{children}</section>;
}

export function StyleguidePage() {
  const [q, setQ] = useState(2);
  const [pw, setPw] = useState("serena2026");
  return (
    <main className="container-page space-y-14 py-10">
      <div className="flex items-center gap-4"><Logo /><span className="eyebrow">Guia de estilo</span></div>
      <Block title="Cores">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map(([n, c, h]) => (
            <li key={n} className="overflow-hidden rounded-2xl bg-card shadow-soft">
              <div className={`h-20 ${c} border-b border-border`} />
              <div className="p-3 text-sm"><p className="font-medium">{n}</p><p className="text-xs text-taupe">{h}</p></div>
            </li>
          ))}
        </ul>
      </Block>
      <Block title="Tipografia">
        <p className="font-serif text-6xl">Cormorant Garamond</p>
        <p className="font-serif text-3xl italic text-taupe">Feita para realçar a beleza da sua pele.</p>
        <p className="text-base">Jost — textos, botões e formulários. Corpo em 16px para leitura confortável.</p>
        <p className="eyebrow">Eyebrow · caixa alta espaçada</p>
        <BlossomMark className="size-12" />
      </Block>
      <Block title="Botões">
        <div className="flex flex-wrap gap-3">
          <Button>Principal</Button><Button variant="outline">Contorno</Button><Button variant="secondary">Secundário</Button>
          <Button variant="ghost">Fantasma</Button><Button variant="link">Link</Button><Button disabled>Desabilitado</Button><Button size="lg">Grande</Button>
        </div>
      </Block>
      <Block title="Campos">
        <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
          <FormField label="E-mail" placeholder="voce@email.com" />
          <FormField label="CEP" defaultValue="99999" error="CEP inválido." />
          <div className="space-y-2"><PasswordField label="Senha" value={pw} onChange={(e) => setPw(e.target.value)} /><PasswordStrength password={pw} /></div>
          <div><p className="mb-1.5 text-sm">Quantidade</p><QuantitySelector value={q} onChange={setQ} /></div>
        </div>
      </Block>
      <Block title="Chips e selos">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-petal/60 px-3 py-1.5 text-sm text-rose-dark">Pele oleosa</span>
          <DiscountBadge preco={10000} precoPromocional={7700} />
          <span className="rounded-full bg-ink/80 px-2.5 py-1 text-xs text-primary-foreground">Esgotado</span>
          <StockBadge disponivel /><StockBadge disponivel={false} />
          <Price preco={14990} precoPromocional={11490} />
        </div>
      </Block>
      <Block title="Cards">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <ProductCard product={products[0]} /><ProductCard product={products[1]} /><ProductCard product={products[3]} /><ProductCardSkeleton />
        </div>
      </Block>
      <Block title="Estados">
        <div className="grid gap-4 md:grid-cols-3">
          <EmptyState title="Nada por aqui" description="Nenhum produto encontrado." />
          <ErrorState title="Algo deu errado" description="Não foi possível carregar. Tente novamente." action={<Button variant="outline">Tentar de novo</Button>} />
          <SuccessState title="Tudo certo!" description="Suas alterações foram salvas." />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <InlineAlert>Informação neutra.</InlineAlert><InlineAlert tone="warning">Entregamos somente em SP.</InlineAlert>
          <InlineAlert tone="error">E-mail ou senha incorretos.</InlineAlert><InlineAlert tone="success">Código copiado.</InlineAlert>
        </div>
      </Block>
    </main>
  );
}
