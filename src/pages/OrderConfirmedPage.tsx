import { CheckCircle2, Copy, QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { AppLink } from "@/components/AppLink";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { orders, pixCode } from "@/mocks/commerce";

export function OrderConfirmedPage({ metodo = "pix" }: { metodo?: string }) {
  const order = orders[2];
  const [left, setLeft] = useState(30 * 60);
  const [copied, setCopied] = useState(false);
  useEffect(() => { const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(t); }, []);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const copy = async () => { try { await navigator.clipboard.writeText(pixCode); } catch { /* sem permissão */ } setCopied(true); setTimeout(() => setCopied(false), 2500); };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <Logo className="mb-8" />
      <main className="w-full max-w-lg rounded-2xl bg-card p-6 text-center shadow-lift sm:p-8">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success"><CheckCircle2 className="size-7" aria-hidden="true" /></span>
        <h1 className="mt-4 text-4xl">Pedido recebido!</h1>
        <p className="mt-2 text-sm text-taupe">Pedido <strong className="text-ink">{order.numero}</strong> · {formatPrice(order.total)}</p>
        {metodo === "pix" ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm">Pague com Pix para confirmar. O código expira em</p>
            <p className="font-serif text-5xl tabular-nums text-rose" role="timer" aria-live="off">{mm}:{ss}</p>
            <div className="mx-auto grid size-52 place-items-center rounded-2xl border border-border bg-background" role="img" aria-label="QR Code do Pix">
              <QrCode className="size-40 text-ink" strokeWidth={1} aria-hidden="true" />
            </div>
            <p className="break-all rounded-xl bg-muted p-3 text-left text-xs text-taupe">{pixCode}</p>
            <Button className="w-full" onClick={copy}><Copy /> {copied ? "Código copiado!" : "Copiar código"}</Button>
            <p className="sr-only" aria-live="polite">{copied ? "Código Pix copiado" : ""}</p>
          </div>
        ) : (
          <p className="mt-6 text-sm text-taupe">Você receberá a confirmação por e-mail assim que o pagamento for aprovado.</p>
        )}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" className="flex-1"><AppLink href={`/conta/pedidos/${order.id}`}>Acompanhar pedido</AppLink></Button>
          <Button asChild variant="ghost" className="flex-1"><AppLink href="/">Voltar à loja</AppLink></Button>
        </div>
      </main>
    </div>
  );
}
