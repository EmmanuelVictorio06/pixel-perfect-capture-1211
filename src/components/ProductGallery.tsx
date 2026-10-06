import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images }: { images: { path: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const el = ref.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <div>
      {/* celular: carrossel com scroll-snap */}
      <div className="md:hidden">
        <div ref={ref} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl" aria-label="Fotos do produto">
          {images.map((img, i) => (
            <img key={i} src={img.path} alt={img.alt} width={816} height={816} loading={i ? "lazy" : "eager"} className="aspect-square w-full shrink-0 snap-center object-cover" />
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
          {images.map((_, i) => <span key={i} className={cn("h-1.5 rounded-full transition-all", i === active ? "w-6 bg-rose" : "w-1.5 bg-petal")} />)}
        </div>
      </div>
      {/* desktop: grade */}
      <div className="hidden grid-cols-2 gap-3 md:grid">
        {images.map((img, i) => (
          <img key={i} src={img.path} alt={img.alt} width={816} height={816} className={cn("aspect-square w-full rounded-2xl object-cover", i === 0 && "col-span-2")} />
        ))}
      </div>
    </div>
  );
}
