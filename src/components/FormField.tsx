import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordStrength } from "@/lib/format";
import { cn } from "@/lib/utils";

type FieldProps = ComponentProps<typeof Input> & { label: string; error?: string; hint?: string };

export function FormField({ label, error, hint, id, className, ...props }: FieldProps) {
  const auto = useId();
  const fid = id ?? auto;
  const describedBy = [error && `${fid}-err`, hint && `${fid}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={fid} className="text-sm font-normal text-ink">{label}</Label>
      <Input id={fid} aria-invalid={!!error} aria-describedby={describedBy} {...props} />
      {hint && !error && <p id={`${fid}-hint`} className="text-xs text-taupe">{hint}</p>}
      {error && <p id={`${fid}-err`} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export function PasswordField({ label, error, hint, id, className, ...props }: FieldProps) {
  const [show, setShow] = useState(false);
  const auto = useId();
  const fid = id ?? auto;
  const describedBy = [error && `${fid}-err`, hint && `${fid}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={fid} className="text-sm font-normal text-ink">{label}</Label>
      <div className="relative">
        <Input id={fid} type={show ? "text" : "password"} aria-invalid={!!error} aria-describedby={describedBy} className="pr-12" {...props} />
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar senha" : "Mostrar senha"} aria-pressed={show}
          className="absolute right-0.5 top-0.5 grid size-11 place-items-center rounded-full text-taupe hover:text-rose">
          {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      {hint && !error && <p id={`${fid}-hint`} className="text-xs text-taupe">{hint}</p>}
      {error && <p id={`${fid}-err`} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

const levels = ["Muito fraca", "Fraca", "Boa", "Forte"];

export function PasswordStrength({ password }: { password: string }) {
  const s = password ? passwordStrength(password) : 0;
  return (
    <div className="space-y-1.5" aria-live="polite">
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full transition-colors", s >= i ? (s === 1 ? "bg-destructive" : s === 2 ? "bg-gold" : "bg-success") : "bg-muted")} />
        ))}
      </div>
      <p className="text-xs text-taupe">
        {password ? <>Força da senha: <strong className="font-medium text-ink">{levels[s]}</strong> · </> : null}
        Mínimo de 8 caracteres, com letras e números.
      </p>
    </div>
  );
}
