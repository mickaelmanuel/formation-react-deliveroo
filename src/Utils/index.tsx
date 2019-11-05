export function formatToEuroCurrency(price: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}

export function isNotNull(obj: any) {
  return obj && obj !== "null" && obj !== "undefined";
}

export function isNull(obj: any) {
  return !isNotNull(obj);
}
