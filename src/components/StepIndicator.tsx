import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Etapas do checkout">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex flex-1 items-center gap-2" aria-current={active ? "step" : undefined}>
            <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border text-sm",
              done && "border-rose bg-rose text-primary-foreground", active && "border-rose text-rose", !done && !active && "border-border text-taupe")}>
              {done ? <Check className="size-4" aria-hidden="true" /> : i + 1}
            </span>
            <span className={cn("text-sm", active ? "text-ink" : "text-taupe", !active && "hidden sm:inline")}>{s}</span>
            {i < steps.length - 1 && <span className={cn("h-px flex-1", done ? "bg-rose" : "bg-border")} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
