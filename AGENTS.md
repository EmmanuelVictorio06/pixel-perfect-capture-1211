<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- UI-only prototype: reusable visual components in `src/components/`, screens in `src/pages/`, thin TanStack route files in `src/routes/` — the screens get ported to an existing Next.js app.
- Components never import the router; internal links go through `AppLink` (single swap point for `next/link`).
- All data is mock data in `src/mocks/` using the brief's exact type names; prices are integer cents formatted via `src/lib/format.ts`.
