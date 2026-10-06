import { brands, categories, products } from "./catalog";

export const adminStats = {
  vendasDia: 89470,
  pedidosDia: 7,
  vendasMes: 1843290,
  pedidosMes: 142,
  aguardandoEnvio: 5,
  semEstoque: 2,
};

export const adminProducts = products.map((p, i) => ({
  ...p,
  sku: `SB-${String(1000 + i * 7)}`,
  estoque: p.disponivel ? [24, 8, 3, 15, 41, 6][i % 6] : 0,
  reservado: p.disponivel ? i % 3 : 0,
  oculto: i === 10,
}));

export type AdminProduct = (typeof adminProducts)[number];

export const adminBrands = brands.map((b, i) => ({ ...b, id: `b${i}`, visivel: i !== 5, produtos: 3 + i }));
export const adminCategories = categories.map((c, i) => ({ ...c, id: `c${i}`, visivel: true, produtos: 2 + (i % 4) }));

export const coupons = [
  { id: "cp1", codigo: "BEMVINDA10", descricao: "10% na primeira compra", ativo: true, usos: 58 },
  { id: "cp2", codigo: "FRETESP", descricao: "Frete grátis acima de R$ 150", ativo: true, usos: 21 },
  { id: "cp3", codigo: "BLACK25", descricao: "25% em toda a loja", ativo: false, usos: 0 },
];
