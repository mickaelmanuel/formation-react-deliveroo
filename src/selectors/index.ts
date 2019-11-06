import { IPanier } from "../Interfaces";

export function selectPanier(state: any): Array<IPanier> {
  return state.panier;
}

export function selectData(state: any): any {
  return state.data;
}
