import { ItemActionTypes, INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_ITEM, ADD_ITEM } from "./types";
import { IPanierLight } from "../../../Interfaces";

export const incrementItem = (id: string): ItemActionTypes => {
  return {
    type: INCREMENT_ITEM,
    payload: id
  };
};

export const decrementItem = (id: string): ItemActionTypes => {
  return {
    type: DECREMENT_ITEM,
    payload: id
  };
};

export const removeItem = (id: string): ItemActionTypes => {
  return {
    type: REMOVE_ITEM,
    payload: id
  };
};

export const addItem = (item: IPanierLight): ItemActionTypes => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};
