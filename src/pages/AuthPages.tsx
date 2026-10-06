import { MailCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { AppLink } from "@/components/AppLink";
import { AuthCard } from "@/components/AuthCard";
import { FormField, PasswordField, PasswordStrength } from "@/components/FormField";
import { InlineAlert } from "@/components/States";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { passwordStrength } from "@/lib/format";

const emailOk = (e: string) => /^\S+@\S+\.\S+$/.test(e);

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<{ email?: string; pw?: string; form?: string }>({});
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: typeof err = {};
    if (!emailOk(email)) x.email = "Informe um e-mail válido.";
    if (!pw) x.pw = "Informe sua senha.";
    if (!x.email && !x.pw) x.form = "E-mail ou senha incorretos.";
    setErr(x);
  };
  return (
    <AuthCard title="Entrar" description="Que bom ver você de novo." footer={<>Ainda não tem conta? <AppLink href="/criar-conta" className="text-rose underline">Criar conta</AppLink></>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        {err.form && <InlineAlert tone="error">{err.form}</InlineAlert>}
        <FormField label="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={err.email} />
        <PasswordField label="Senha" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} error={err.pw} />
        <AppLink href="/esqueci-senha" className="inline-flex min-h-11 items-center text-sm text-rose underline">Esqueci minha senha</AppLink>
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </AuthCard>
  );
}

export function SignupPage() {
  const [f, setF] = useState({ nome: "", email: "", pw: "", ok: false });
  const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!f.nome.trim()) x.nome = "Informe seu nome.";
    if (!emailOk(f.email)) x.email = "Informe um e-mail válido.";
    if (passwordStrength(f.pw) < 2) x.pw = "A senha precisa ter ao menos 8 caracteres, com letras e números.";
    if (!f.ok) x.ok = "É preciso aceitar a política de privacidade.";
    setErr(x);
  };
  return (
    <AuthCard title="Criar conta" description="Acompanhe pedidos e salve seus endereços." footer={<>Já tem conta? <AppLink href="/entrar" className="text-rose underline">Entrar</AppLink></>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <FormField label="Nome completo" autoComplete="name" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} error={err.nome} />
        <FormField label="E-mail" type="email" autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} error={err.email} />
        <PasswordField label="Senha" autoComplete="new-password" value={f.pw} onChange={(e) => setF({ ...f, pw: e.target.value })} error={err.pw} />
        <PasswordStrength password={f.pw} />
        <div>
          <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm">
            <Checkbox checked={f.ok} onCheckedChange={(v) => setF({ ...f, ok: v === true })} className="mt-0.5 size-5" aria-invalid={!!err.ok} aria-describedby={err.ok ? "ok-err" : undefined} />
            <span>Li e aceito a <AppLink href="/privacidade" className="text-rose underline">política de privacidade</AppLink>.</span>
          </label>
          {err.ok && <p id="ok-err" className="text-sm text-destructive">{err.ok}</p>}
        </div>
        <Button type="submit" className="w-full">Criar conta</Button>
      </form>
    </AuthCard>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  return (
    <AuthCard title="Esqueci minha senha" description="Enviaremos um link para você criar uma nova senha." footer={<AppLink href="/entrar" className="text-rose underline">Voltar para entrar</AppLink>}>
      {sent ? <InlineAlert tone="success">Se houver uma conta com este e-mail, você receberá o link em instantes.</InlineAlert> : (
        <form onSubmit={(e) => { e.preventDefault(); if (!emailOk(email)) return setErr("Informe um e-mail válido."); setSent(true); }} className="space-y-4" noValidate>
          <FormField label="E-mail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={err} />
          <Button type="submit" className="w-full">Enviar link</Button>
        </form>
      )}
    </AuthCard>
  );
}

export function NewPasswordPage() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (passwordStrength(pw) < 2) x.pw = "Mínimo de 8 caracteres, com letras e números.";
    if (pw !== pw2) x.pw2 = "As senhas não coincidem.";
    setErr(x);
    if (!Object.keys(x).length) setDone(true);
  };
  return (
    <AuthCard title="Nova senha" description="Escolha uma senha segura.">
      {done ? (
        <div className="space-y-4"><InlineAlert tone="success">Senha alterada com sucesso.</InlineAlert><Button asChild className="w-full"><AppLink href="/entrar">Entrar</AppLink></Button></div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <PasswordField label="Nova senha" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} error={err.pw} />
          <PasswordStrength password={pw} />
          <PasswordField label="Confirmar nova senha" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} error={err.pw2} />
          <Button type="submit" className="w-full">Salvar nova senha</Button>
        </form>
      )}
    </AuthCard>
  );
}

export function ConfirmEmailPage() {
  const [resent, setResent] = useState(false);
  return (
    <AuthCard title="Confirme seu e-mail">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-secondary text-rose"><MailCheck className="size-7" aria-hidden="true" /></span>
        <p className="text-sm text-taupe">Enviamos um link de confirmação para <strong className="text-ink">mariana@email.com</strong>. Abra seu e-mail e toque no link para ativar sua conta.</p>
        {resent && <InlineAlert tone="success">E-mail reenviado.</InlineAlert>}
        <Button variant="outline" className="w-full" onClick={() => setResent(true)}>Reenviar e-mail</Button>
        <AppLink href="/entrar" className="inline-flex min-h-11 items-center text-sm text-rose underline">Voltar para entrar</AppLink>
      </div>
    </AuthCard>
  );
}
