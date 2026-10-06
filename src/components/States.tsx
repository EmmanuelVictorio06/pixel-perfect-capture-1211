import { AlertCircle, CheckCircle2, type LucideIcon, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StateProps = { title: string; description?: string; action?: ReactNode; icon?: LucideIcon; className?: string };

function StateBox({ title, description, action, icon: Icon, tone, className }: StateProps & { tone: "neutral" | "error" | "success" }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("flex flex-col items-center gap-3 rounded-2xl bg-card px-6 py-12 text-center shadow-soft", className)}>
      {Icon && (
        <span className={cn("grid size-14 place-items-center rounded-full",
          tone === "error" ? "bg-destructive/10 text-destructive" : tone === "success" ? "bg-success/10 text-success" : "bg-secondary text-rose")}>
          <Icon className="size-6" aria-hidden="true" />
        </span>
      )}
      <h3 className="text-2xl text-ink">{title}</h3>
      {description && <p className="max-w-sm text-sm text-taupe">{description}</p>}
      {action && <div className="mt-2 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}

export const EmptyState = (p: StateProps) => <StateBox icon={SearchX} {...p} tone="neutral" />;
export const ErrorState = (p: StateProps) => <StateBox icon={AlertCircle} {...p} tone="error" />;
export const SuccessState = (p: StateProps) => <StateBox icon={CheckCircle2} {...p} tone="success" />;

export function InlineAlert({ tone = "info", children }: { tone?: "info" | "warning" | "error" | "success"; children: ReactNode }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("rounded-xl border px-4 py-3 text-sm",
      tone === "warning" && "border-warning/40 bg-warning/10 text-ink",
      tone === "error" && "border-destructive/30 bg-destructive/5 text-destructive",
      tone === "success" && "border-success/30 bg-success/10 text-success",
      tone === "info" && "border-border bg-secondary/60 text-ink")}>
      {children}
    </div>
  );
}
