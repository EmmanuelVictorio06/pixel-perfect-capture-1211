import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import type { ProductCard, ProductDetail, SkinType } from "./types";

export const categories = [
  { nome: "Limpeza", slug: "limpeza" },
  { nome: "Tônico", slug: "tonico" },
  { nome: "Sérum e Essência", slug: "serum-essencia" },
  { nome: "Hidratante", slug: "hidratante" },
  { nome: "Protetor Solar", slug: "protetor-solar" },
  { nome: "Máscara", slug: "mascara" },
  { nome: "Lábios", slug: "labios" },
];

export const brands = [
  { nome: "Anua", slug: "anua" },
  { nome: "Beauty of Joseon", slug: "beauty-of-joseon" },
  { nome: "COSRX", slug: "cosrx" },
  { nome: "Laneige", slug: "laneige" },
  { nome: "Skin1004", slug: "skin1004" },
  { nome: "Medicube", slug: "medicube" },
  { nome: "Round Lab", slug: "round-lab" },
];

export const skinTypes: { value: SkinType; label: string }[] = [
  { value: "oleosa", label: "Oleosa" },
  { value: "seca", label: "Seca" },
  { value: "mista", label: "Mista" },
  { value: "normal", label: "Normal" },
  { value: "sensivel", label: "Sensível" },
];

const imgs = [p1, p2, p3];

type Seed = [string, string, string | null, number, number | null, number, boolean, number, SkinType[]];
// nome, slug, volume, preco, promo, brandIdx, disponivel, catIdx, peles
const seeds: Seed[] = [
  ["Óleo de Limpeza Heartleaf Pore Control", "oleo-limpeza-heartleaf", "200 ml", 14990, 11490, 0, true, 0, ["oleosa", "mista"]],
  ["Relief Sun Rice + Probiotics FPS 50", "relief-sun-rice", "50 ml", 11990, null, 1, true, 4, ["normal", "seca", "sensivel"]],
  ["Advanced Snail 96 Mucin Power Essence", "snail-96-mucin", "100 ml", 12990, 9990, 2, true, 2, ["seca", "normal", "mista"]],
  ["Lip Sleeping Mask Berry", "lip-sleeping-mask", "20 g", 13990, null, 3, false, 6, ["normal", "seca"]],
  ["Madagascar Centella Ampoule", "centella-ampoule", "55 ml", 10990, 8990, 4, true, 2, ["sensivel", "oleosa"]],
  ["Zero Pore Pad 2.0", "zero-pore-pad", "70 un", 15990, null, 5, true, 1, ["oleosa", "mista"]],
  ["Dokdo Toner 1025", "dokdo-toner", "200 ml", 10990, null, 6, true, 1, ["normal", "seca", "sensivel"]],
  ["Glow Deep Serum Rice + Alpha-Arbutin", "glow-deep-serum", "30 ml", 9990, 7990, 1, true, 2, ["normal", "mista"]],
  ["Heartleaf 77% Soothing Toner", "heartleaf-toner", "250 ml", 13490, null, 0, true, 1, ["sensivel", "oleosa"]],
  ["Water Sleeping Mask", "water-sleeping-mask", "70 ml", 16990, 13990, 3, true, 5, ["seca", "normal"]],
  ["Low pH Good Morning Gel Cleanser", "low-ph-cleanser", "150 ml", 7990, null, 2, false, 0, ["oleosa", "mista", "sensivel"]],
  ["Birch Juice Moisturizing Cream", "birch-moisturizing-cream", "80 ml", 12490, null, 6, true, 3, ["seca", "normal"]],
];

export const products: ProductCard[] = seeds.map((s, i) => ({
  id: `p${i + 1}`,
  nome: s[0],
  slug: s[1],
  volume: s[2],
  preco: s[3],
  precoPromocional: s[4],
  marca: brands[s[5]].nome,
  imagem: { path: imgs[i % 3], alt: `Embalagem do produto ${s[0]}` },
  disponivel: s[6],
}));

export const productDetails: Record<string, ProductDetail> = Object.fromEntries(
  products.map((p, i) => [
    p.slug,
    {
      ...p,
      descricao:
        "Fórmula leve e delicada, inspirada nos rituais de cuidado coreanos. Ajuda a acalmar, hidratar e equilibrar a pele, deixando um acabamento confortável e luminoso ao longo do dia.",
      modoUso:
        "Após a limpeza, aplique uma pequena quantidade sobre o rosto seco, com movimentos suaves de dentro para fora. Use de manhã e à noite. Pela manhã, finalize com protetor solar.",
      ingredientes:
        "Water, Glycerin, Butylene Glycol, Centella Asiatica Extract, Niacinamide, Panthenol, Sodium Hyaluronate, Allantoin, Adenosine, Ceramide NP, Xanthan Gum, 1,2-Hexanediol.",
      tiposPele: seeds[i][8],
      marcaSlug: brands[seeds[i][5]].slug,
      categoria: categories[seeds[i][7]],
      imagens: [0, 1, 2].map((k) => ({ path: imgs[(i + k) % 3], alt: `${p.nome} — foto ${k + 1}` })),
    },
  ]),
);

export const getProduct = (slug: string) => productDetails[slug] ?? productDetails[products[0].slug];
