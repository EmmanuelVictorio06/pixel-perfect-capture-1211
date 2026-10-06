import { cn } from "@/lib/utils";
import { AppLink } from "./AppLink";

export function BlossomMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("text-rose", className)}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="11" rx="6" ry="9" transform={`rotate(${r} 20 20)`} className="fill-petal stroke-rose" strokeWidth="1" />
      ))}
      <circle cx="20" cy="20" r="3" className="fill-gold" />
    </svg>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <AppLink href={href} aria-label="Serena Beauty — página inicial" className={cn("inline-flex items-center gap-2 min-h-11", className)}>
      <BlossomMark className="size-8" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl text-ink">Serena</span>
        <span className="text-[0.55rem] tracking-[0.45em] text-taupe">BEAUTY</span>
      </span>
    </AppLink>
  );
}
