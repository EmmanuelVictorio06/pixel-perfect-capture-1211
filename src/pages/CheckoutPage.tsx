import { Lock, Plus } from "lucide-react";
import { useState } from "react";
import { AddressCard } from "@/components/AddressCard";
import { AddressForm, type AddressDraft } from "@/components/AddressForm";
import { AppLink } from "@/components/AppLink";
import { FormField } from "@/components/FormField";
import { Logo } from "@/components/Logo";
import { OrderSummary } from "@/components/OrderSummary";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { StepIndicator } from "@/components/StepIndicator";
import { StickyActionBar } from "@/components/StickyActionBar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice, maskCard, maskCpf, maskPhone } from "@/lib/format";
import { addresses, cartItems, FREE_SHIPPING_THRESHOLD, shippingQuotes } from "@/mocks/commerce";

const steps = ["Entrega", "Dados", "Pagamento"];
const blankAddr: AddressDraft = { apelido: "", destinatario: "", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", uf: "" };

export function CheckoutPage({ onFinish }: { onFinish: (metodo: string) => void }) {
  const [step, setStep] = useState(0);
  const [addrId, setAddrId] = useState(addresses[0].id);
  const [newAddr, setNewAddr] = useState(false);
  const [draft, setDraft] = useState(blankAddr);
  const [cepStatus, setCepStatus] = useState<"idle" | "loading" | "ok" | "not_sp" | "not_found">("idle");
  const [ship, setShip] = useState(shippingQuotes[0].servicoId);
  const [cpf, setCpf] = useState("");
  const [tel, setTel] = useState("");
  const [errors, setErrors] = useState<{ cpf?: string; tel?: string }>({});
  const [method, setMethod] = useState("pix");
  const [card, setCard] = useState("");

  const subtotal = cartItems.filter((i) => i.disponivel).reduce((a, i) => a + i.subtotal, 0);
  const items = cartItems.filter((i) => i.disponivel);
  const free = subtotal >= FREE_SHIPPING_THRESHOLD;
  const q = shippingQuotes.find((x) => x.servicoId === ship)!;
  const shipping = free ? 0 : q.preco;
  const total = subtotal + shipping;

  const lookup = (cep: string) => {
    setCepStatus("loading");
    setTimeout(() => {
      if (cep.startsWith("0") || cep.startsWith("1")) {
        setDraft((d) => ({ ...d, cep, logradouro: "Rua Major Claudiano", bairro: "Centro", cidade: "Franca", uf: "SP" }));
        setCepStatus("ok");
      } else setCepStatus(cep.startsWith("9") ? "not_found" : "not_sp");
    }, 600);
  };

  const next = () => {
    if (step === 1) {
      const e: typeof errors = {};
      if (cpf.length !== 14) e.cpf = "Informe um CPF válido.";
      if (tel.length < 14) e.tel = "Informe um telefone com DDD.";
      setErrors(e);
      if (Object.keys(e).length) return;
    }
    if (step === 2) return onFinish(method);
    setStep((s) => s + 1);
  };
  const cta = step === 2 ? `Pagar ${formatPrice(total)}` : "Continuar";

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />
          <span className="flex items-center gap-1.5 text-xs text-taupe"><Lock className="size-3.5" aria-hidden="true" /> Compra segura</span>
        </div>
      </header>
      <main className="container-page py-6 md:py-10">
        <StepIndicator steps={steps} current={step} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem]">
          <div className="order-2 space-y-6 lg:order-1">
            {step === 0 && (
              <>
                <section className="space-y-3">
                  <h1 className="text-3xl">Endereço de entrega</h1>
                  {!newAddr ? (
                    <>
                      {addresses.map((a) => <AddressCard key={a.id} address={a} selected={addrId === a.id} onSelect={() => setAddrId(a.id)} />)}
                      <Button variant="ghost" onClick={() => setNewAddr(true)}><Plus /> Cadastrar novo endereço</Button>
                    </>
                  ) : (
                    <div className="rounded-2xl bg-card p-5 shadow-soft">
                      <AddressForm value={draft} onChange={setDraft} onCepLookup={lookup} cepStatus={cepStatus} onSubmit={() => setNewAddr(false)} submitLabel="Usar este endereço" />
                      <Button variant="link" className="mt-2" onClick={() => setNewAddr(false)}>Voltar aos endereços salvos</Button>
                    </div>
                  )}
                </section>
                <section className="space-y-3">
                  <h2 className="text-2xl">Frete</h2>
                  <ShippingCalculator cep={addresses[0].cep} onCepChange={() => {}} onCalculate={() => {}} status="success" quotes={shippingQuotes} freeShipping={free} selectedId={ship} onSelect={setShip} />
                </section>
              </>
            )}
            {step === 1 && (
              <section className="space-y-4 rounded-2xl bg-card p-5 shadow-soft">
                <h1 className="text-3xl">Seus dados</h1>
                <p className="text-sm text-taupe">Usamos o CPF para emitir a nota fiscal.</p>
                <FormField label="CPF" inputMode="numeric" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(maskCpf(e.target.value))} error={errors.cpf} />
                <FormField label="Telefone (WhatsApp)" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" value={tel} onChange={(e) => setTel(maskPhone(e.target.value))} error={errors.tel} />
              </section>
            )}
            {step === 2 && (
              <section className="space-y-4">
                <h1 className="text-3xl">Pagamento</h1>
                <Tabs value={method} onValueChange={setMethod}>
                  <TabsList className="grid h-12 w-full grid-cols-3 rounded-full bg-secondary p-1">
                    {["pix", "cartao", "boleto"].map((m) => (
                      <TabsTrigger key={m} value={m} className="h-full rounded-full text-sm data-[state=active]:bg-card data-[state=active]:text-rose-dark">
                        {m === "pix" ? "Pix" : m === "cartao" ? "Cartão" : "Boleto"}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="pix" className="mt-4 rounded-2xl bg-card p-5 text-sm text-taupe shadow-soft">
                    Aprovação imediata. O QR Code será exibido após confirmar — ele vale por 30 minutos.
                  </TabsContent>
                  <TabsContent value="cartao" className="mt-4 space-y-4 rounded-2xl bg-card p-5 shadow-soft">
                    <FormField label="Número do cartão" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={card} onChange={(e) => setCard(maskCard(e.target.value))} />
                    <FormField label="Nome impresso no cartão" autoComplete="cc-name" />
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Validade" placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
                      <FormField label="CVV" placeholder="000" inputMode="numeric" autoComplete="cc-csc" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="parcelas" className="font-normal">Parcelas</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="parcelas" className="h-12 rounded-xl bg-card text-base"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((n) => <SelectItem key={n} value={String(n)}>{n}x de {formatPrice(Math.round(total / n))} sem juros</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                  <TabsContent value="boleto" className="mt-4 rounded-2xl bg-card p-5 text-sm text-taupe shadow-soft">
                    O boleto vence em 3 dias úteis. O pedido é separado após a compensação (até 2 dias úteis).
                  </TabsContent>
                </Tabs>
              </section>
            )}
            <div className="hidden gap-3 md:flex">
              {step > 0 && <Button variant="outline" onClick={() => setStep((s) => s - 1)}>Voltar</Button>}
              <Button size="lg" className="flex-1" onClick={next}>{cta}</Button>
            </div>
            <AppLink href="/carrinho" className="inline-flex min-h-11 items-center text-sm text-taupe underline">Voltar ao carrinho</AppLink>
          </div>
          <aside className="order-1 lg:order-2 lg:sticky lg:top-6 lg:self-start">
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} collapsibleOnMobile />
          </aside>
        </div>
      </main>
      <StickyActionBar>
        {step > 0 && <Button variant="outline" onClick={() => setStep((s) => s - 1)}>Voltar</Button>}
        <Button size="lg" className="flex-1" onClick={next}>{cta}</Button>
      </StickyActionBar>
    </div>
  );
}
