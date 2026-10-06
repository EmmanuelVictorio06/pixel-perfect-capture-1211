import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/format";

export type FilterState = { marcas: string[]; categorias: string[]; peles: string[]; preco: [number, number] };
type Option = { value: string; label: string };

type Props = {
  value: FilterState;
  onChange: (v: FilterState) => void;
  brands: Option[];
  categories: Option[];
  skinTypes: Option[];
  priceMax: number;
};

function Group({ title, options, selected, onToggle }: { title: string; options: Option[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <fieldset className="space-y-1">
      <legend className="eyebrow mb-2">{title}</legend>
      {options.map((o) => (
        <label key={o.value} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm">
          <Checkbox checked={selected.includes(o.value)} onCheckedChange={() => onToggle(o.value)} className="size-5" />
          {o.label}
        </label>
      ))}
    </fieldset>
  );
}

const toggle = (arr: string[], v: string) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

export function CatalogFilters({ value, onChange, brands, categories, skinTypes, priceMax }: Props) {
  return (
    <div className="space-y-6">
      <Group title="Categoria" options={categories} selected={value.categorias} onToggle={(v) => onChange({ ...value, categorias: toggle(value.categorias, v) })} />
      <Group title="Marca" options={brands} selected={value.marcas} onToggle={(v) => onChange({ ...value, marcas: toggle(value.marcas, v) })} />
      <Group title="Tipo de pele" options={skinTypes} selected={value.peles} onToggle={(v) => onChange({ ...value, peles: toggle(value.peles, v) })} />
      <fieldset>
        <legend className="eyebrow mb-4">Faixa de preço</legend>
        <Slider min={0} max={priceMax} step={1000} value={value.preco} onValueChange={(v) => onChange({ ...value, preco: [v[0], v[1]] })} aria-label="Faixa de preço" />
        <p className="mt-3 text-sm text-taupe">{formatPrice(value.preco[0])} – {formatPrice(value.preco[1])}</p>
      </fieldset>
    </div>
  );
}

export function ActiveFilterChips({ chips, onRemove, onClear }: { chips: { key: string; label: string }[]; onRemove: (key: string) => void; onClear: () => void }) {
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button key={c.key} type="button" onClick={() => onRemove(c.key)} aria-label={`Remover filtro ${c.label}`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-petal/70 px-3 text-sm text-rose-dark hover:bg-petal">
          {c.label} <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}
      <button type="button" onClick={onClear} className="min-h-9 px-2 text-sm text-taupe underline hover:text-rose">Limpar tudo</button>
    </div>
  );
}
