import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function AuthCard({ title, description, children, footer }: { title: string; description?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <Logo className="mb-8" />
      <main className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lift sm:p-8">
        <h1 className="text-3xl text-ink">{title}</h1>
        {description && <p className="mt-2 text-sm text-taupe">{description}</p>}
        <div className="mt-6">{children}</div>
      </main>
      {footer && <div className="mt-6 text-center text-sm text-taupe">{footer}</div>}
    </div>
  );
}
