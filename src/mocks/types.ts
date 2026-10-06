export type SkinType = "oleosa" | "seca" | "mista" | "normal" | "sensivel";

export type ProductCard = {
  id: string;
  nome: string;
  slug: string;
  volume: string | null;
  preco: number; // centavos
  precoPromocional: number | null; // centavos
  marca: string;
  imagem: { path: string; alt: string } | null;
  disponivel: boolean;
};

export type ProductDetail = ProductCard & {
  descricao: string | null;
  modoUso: string | null;
  ingredientes: string | null;
  tiposPele: SkinType[];
  marcaSlug: string;
  categoria: { nome: string; slug: string };
  imagens: { path: string; alt: string }[];
};

export type CartItemView = {
  productId: string;
  nome: string;
  slug: string;
  marca: string;
  volume: string | null;
  imagem: string | null;
  precoUnitario: number;
  precoOriginal: number;
  quantidade: number;
  subtotal: number;
  disponivel: boolean;
};

export type ShippingQuote = {
  servicoId: string;
  servicoNome: string;
  transportadora: string;
  preco: number;
  prazoDias: number;
};

export type OrderStatus =
  | "aguardando_pagamento"
  | "pago"
  | "em_separacao"
  | "enviado"
  | "entregue"
  | "cancelado"
  | "reembolsado";

export type Address = {
  id: string;
  apelido: string;
  destinatario: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  padrao: boolean;
};

export type OrderSummaryView = {
  id: string;
  numero: string;
  criadoEm: string;
  status: OrderStatus;
  total: number;
  frete: number;
  itens: CartItemView[];
  endereco: Address;
  envio: { servicoNome: string; transportadora: string; rastreio: string | null };
  cliente?: string;
};
