import { useRouter } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

type AppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Link simples. Único ponto acoplado ao roteador — troque por `next/link` no projeto real.
 */
export function AppLink({ href, onClick, ...props }: AppLinkProps) {
  const router = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (href.startsWith("http") || href.startsWith("#")) return;
    e.preventDefault();
    router.navigate({ href });
  };
  return <a href={href} onClick={handle} {...props} />;
}
