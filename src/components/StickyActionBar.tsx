import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Barra fixa no rodapé — apenas no celular (some a partir de md). */
export function StickyActionBar({ children, className, alwaysVisible }: { children: ReactNode; className?: string; alwaysVisible?: boolean }) {
  return (
    <>
      <div className={cn("h-24", alwaysVisible ? "" : "md:hidden")} aria-hidden="true" />
      <div className={cn("fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur", alwaysVisible ? "" : "md:hidden", className)}>
        <div className="mx-auto flex max-w-3xl items-center gap-3">{children}</div>
      </div>
    </>
  );
}
