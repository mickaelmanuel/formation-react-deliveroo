import { Panier } from "../action";

export function selectPanier(state: any): Array<Panier> {
  return state.panier;
}

export function selectData(state: any): any {
  return state.data;
}