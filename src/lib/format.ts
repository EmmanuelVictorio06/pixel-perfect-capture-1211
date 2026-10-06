const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Formata centavos (inteiro) em BRL. */
export const formatPrice = (cents: number) => brl.format(cents / 100);

export const discountPercent = (preco: number, promo: number | null) =>
  promo && promo < preco ? Math.round((1 - promo / preco) * 100) : 0;

const digits = (v: string) => v.replace(/\D/g, "");

export const maskCep = (v: string) => digits(v).slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");

export const maskCpf = (v: string) =>
  digits(v)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

export const maskPhone = (v: string) => {
  const d = digits(v).slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};

export const maskCard = (v: string) => digits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

/** Força: 0 a 3. Requisito mínimo = 8+ caracteres com letras e números. */
export const passwordStrength = (pw: string) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-zA-Z]/.test(pw) && /\d/.test(pw)) s++;
  if (pw.length >= 12 || /[^a-zA-Z0-9]/.test(pw)) s++;
  return s;
};
