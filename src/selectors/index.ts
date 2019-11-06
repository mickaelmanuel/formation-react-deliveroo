import { AppState } from "../store";
import { PanierState } from "../store/reducer/panier/types";

export function selectPanier(state: AppState): PanierState {
  return state.panier;
}

export function selectData(state: AppState): any {
  return state.data;
}
