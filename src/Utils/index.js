export function formatToEuroCurrency(price) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(price);
}

export function isNotNull(obj) {
  return obj && obj !== "null" && obj !== "undefined";
}

export function isNull(obj) {
  return !isNotNull(obj);
}
