import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AppLink } from "./AppLink";
import { Logo } from "./Logo";

type HeaderProps = {
  cartCount: number;
  isLoggedIn: boolean;
  categories: { nome: string; slug: string }[];
  onOpenCart: () => void;
  onSearch: (q: string) => void;
};

function SearchForm({ onSearch, id }: { onSearch: (q: string) => void; id: string }) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(String(new FormData(e.currentTarget).get("q") ?? ""));
  };
  return (
    <form role="search" onSubmit={submit} className="relative w-full">
      <label htmlFor={id} className="sr-only">Buscar produtos</label>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-taupe" aria-hidden="true" />
      <input id={id} name="q" type="search" placeholder="Buscar sérum, tônico, marca…"
        className="h-11 w-full rounded-full border border-border bg-card pl-10 pr-4 text-base placeholder:text-taupe/80 focus-visible:border-rose focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/25" />
    </form>
  );
}

export function Header({ cartCount, isLoggedIn, categories, onOpenCart, onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <p className="bg-rose py-1.5 text-center text-xs tracking-wide text-primary-foreground">
        Frete grátis acima de R$ 200 · Entregamos em todo o estado de SP
      </p>
      <div className="container-page flex h-16 items-center gap-2 md:h-20 md:gap-6">
        <button type="button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)} className="grid size-11 place-items-center rounded-full hover:bg-secondary lg:hidden">
          <Menu className="size-5" />
        </button>
        <Logo className="mr-auto lg:mr-0" />
        <nav aria-label="Categorias" className="hidden flex-1 items-center gap-5 lg:flex">
          <AppLink href="/produtos" className="text-sm text-ink hover:text-rose">Todos</AppLink>
          {categories.slice(0, 5).map((c) => (
            <AppLink key={c.slug} href={`/produtos?categoria=${c.slug}`} className="text-sm text-ink hover:text-rose">{c.nome}</AppLink>
          ))}
        </nav>
        <div className="hidden w-64 md:block"><SearchForm onSearch={onSearch} id="busca-desktop" /></div>
        <AppLink href={isLoggedIn ? "/conta" : "/entrar"} className="flex min-h-11 items-center gap-2 rounded-full px-2 text-sm hover:text-rose">
          <User className="size-5" aria-hidden="true" />
          <span className="hidden sm:inline">{isLoggedIn ? "Minha conta" : "Entrar"}</span>
          <span className="sr-only sm:hidden">{isLoggedIn ? "Minha conta" : "Entrar"}</span>
        </AppLink>
        <button type="button" onClick={onOpenCart} aria-label={`Abrir sacola, ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}
          className="relative grid size-11 place-items-center rounded-full hover:bg-secondary">
          <ShoppingBag className="size-5" />
          {cartCount > 0 && (
            <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-rose px-1 text-[0.7rem] font-medium leading-5 text-primary-foreground">{cartCount}</span>
          )}
        </button>
      </div>
      <div className="container-page pb-3 md:hidden"><SearchForm onSearch={onSearch} id="busca-mobile" /></div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-sm bg-background">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl">Categorias</SheetTitle>
            <SheetDescription className="sr-only">Navegue pelas categorias da loja</SheetDescription>
          </SheetHeader>
          <nav aria-label="Menu principal" className="mt-4 flex flex-col">
            {[{ nome: "Todos os produtos", slug: "" }, ...categories].map((c) => (
              <AppLink key={c.slug || "all"} href={c.slug ? `/produtos?categoria=${c.slug}` : "/produtos"} onClick={() => setMenuOpen(false)}
                className="flex min-h-12 items-center border-b border-border/70 text-base text-ink hover:text-rose">{c.nome}</AppLink>
            ))}
            <AppLink href={isLoggedIn ? "/conta" : "/entrar"} onClick={() => setMenuOpen(false)} className="mt-4 flex min-h-12 items-center text-base text-rose">
              {isLoggedIn ? "Minha conta" : "Entrar ou criar conta"}
            </AppLink>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
