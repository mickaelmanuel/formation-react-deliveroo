import { IPanier, IPanierLight } from "../../../Interfaces";

export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const ADD_ITEM = "ADD_ITEM";

export interface PanierState {
  elements: Array<IPanier>;
}

interface IncrementItemAction {
  type: typeof INCREMENT_ITEM;
  payload: string;
}

interface DecrementItemAction {
  type: typeof DECREMENT_ITEM;
  payload: string;
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: string;
}

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: IPanierLight;
}

export type ItemActionTypes = IncrementItemAction | RemoveItemAction | DecrementItemAction | AddItemAction;
