import { products } from "./catalog";
import type { Address, CartItemView, OrderStatus, OrderSummaryView, ShippingQuote } from "./types";

export const FREE_SHIPPING_THRESHOLD = 20000; // centavos

const toItem = (idx: number, qtd: number): CartItemView => {
  const p = products[idx];
  const unit = p.precoPromocional ?? p.preco;
  return {
    productId: p.id,
    nome: p.nome,
    slug: p.slug,
    marca: p.marca,
    volume: p.volume,
    imagem: p.imagem?.path ?? null,
    precoUnitario: unit,
    precoOriginal: p.preco,
    quantidade: qtd,
    subtotal: unit * qtd,
    disponivel: p.disponivel,
  };
};

export const cartItems: CartItemView[] = [toItem(0, 1), toItem(2, 2), toItem(3, 1)];

export const shippingQuotes: ShippingQuote[] = [
  { servicoId: "pac", servicoNome: "PAC", transportadora: "Correios", preco: 1890, prazoDias: 5 },
  { servicoId: "sedex", servicoNome: "SEDEX", transportadora: "Correios", preco: 2990, prazoDias: 2 },
  { servicoId: "jadlog", servicoNome: ".Package", transportadora: "Jadlog", preco: 2190, prazoDias: 4 },
];

export const addresses: Address[] = [
  {
    id: "a1", apelido: "Casa", destinatario: "Mariana Alves", cep: "14400-000",
    logradouro: "Rua Voluntários da Franca", numero: "1250", complemento: "Apto 42",
    bairro: "Centro", cidade: "Franca", uf: "SP", padrao: true,
  },
  {
    id: "a2", apelido: "Trabalho", destinatario: "Mariana Alves", cep: "01310-100",
    logradouro: "Avenida Paulista", numero: "900", bairro: "Bela Vista",
    cidade: "São Paulo", uf: "SP", padrao: false,
  },
];

export const statusLabels: Record<OrderStatus, string> = {
  aguardando_pagamento: "Aguardando pagamento",
  pago: "Pago",
  em_separacao: "Em separação",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
  reembolsado: "Reembolsado",
};

export const statusFlow: OrderStatus[] = ["aguardando_pagamento", "pago", "em_separacao", "enviado", "entregue"];

const mk = (id: string, numero: string, criadoEm: string, status: OrderStatus, items: CartItemView[], rastreio: string | null, cliente: string): OrderSummaryView => {
  const sub = items.reduce((a, i) => a + i.subtotal, 0);
  const frete = sub >= FREE_SHIPPING_THRESHOLD ? 0 : 1890;
  return {
    id, numero, criadoEm, status, frete, total: sub + frete, itens: items, endereco: addresses[0],
    envio: { servicoNome: "PAC", transportadora: "Correios", rastreio }, cliente,
  };
};

export const orders: OrderSummaryView[] = [
  mk("o1", "SB-10482", "2026-10-04T14:20:00Z", "enviado", [toItem(0, 1), toItem(2, 1)], "QB123456789BR", "Mariana Alves"),
  mk("o2", "SB-10455", "2026-09-21T10:05:00Z", "entregue", [toItem(4, 2)], "QB987654321BR", "Mariana Alves"),
  mk("o3", "SB-10501", "2026-10-06T19:42:00Z", "aguardando_pagamento", [toItem(7, 1)], null, "Juliana Prado"),
  mk("o4", "SB-10499", "2026-10-06T16:10:00Z", "pago", [toItem(9, 1), toItem(6, 1)], null, "Camila Rocha"),
  mk("o5", "SB-10497", "2026-10-06T11:30:00Z", "em_separacao", [toItem(5, 1)], null, "Beatriz Lima"),
  mk("o6", "SB-10410", "2026-09-02T09:00:00Z", "cancelado", [toItem(1, 1)], null, "Mariana Alves"),
];

export const getOrder = (id: string) => orders.find((o) => o.id === id) ?? orders[0];

export const currentUser = { nome: "Mariana", email: "mariana@email.com", cpf: "123.456.789-09", telefone: "(16) 99123-4567" };

export const pixCode =
  "00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540589.905802BR5913SERENA BEAUTY6006FRANCA62070503***6304A1B2";
