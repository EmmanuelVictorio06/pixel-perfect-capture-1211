import { MapPin, MessageCircle } from "lucide-react";
import { AppLink } from "./AppLink";
import { BlossomMark } from "./Logo";

export function Footer({ whatsappHref }: { whatsappHref: string }) {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BlossomMark className="size-8" />
            <span className="font-serif text-2xl">Serena Beauty</span>
          </div>
          <p className="max-w-xs font-serif text-lg italic text-taupe">Feita para realçar a beleza da sua pele.</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow">Atendimento</p>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 text-ink hover:text-rose">
            <MessageCircle className="size-4" aria-hidden="true" /> Fale conosco no WhatsApp
          </a>
          <AppLink href="/privacidade" className="flex min-h-11 items-center text-ink hover:text-rose">Política de privacidade</AppLink>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow">Entrega</p>
          <p className="flex items-start gap-2 text-ink">
            <MapPin className="mt-0.5 size-4 shrink-0 text-rose" aria-hidden="true" />
            Entregamos somente no estado de São Paulo. Envio a partir de Franca/SP.
          </p>
        </div>
      </div>
      <div className="hairline" />
      <p className="container-page py-5 text-center text-xs text-taupe">© 2026 Serena Beauty · Produtos originais de skincare coreano</p>
    </footer>
  );
}
