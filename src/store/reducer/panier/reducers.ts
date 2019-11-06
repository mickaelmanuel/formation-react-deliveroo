import { produce } from "immer";
import { IPanier } from "../../../Interfaces";
import { ItemActionTypes, INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_ITEM, ADD_ITEM, PanierState } from "./types";

const initialState: PanierState = {
  elements: []
};

export const panierReducer = (state = initialState, action: ItemActionTypes): PanierState => {
  switch (action.type) {
    case INCREMENT_ITEM:
      let index = state.elements.findIndex(x => x.id === action.payload);
      return produce(state, draftState => {
        draftState.elements[index].nb = state.elements[index].nb + 1;
      });

    case DECREMENT_ITEM:
      let indexDecrement = state.elements.findIndex(x => x.id === action.payload);

      return produce(state, draftState => {
        draftState.elements[indexDecrement].nb = state.elements[indexDecrement].nb - 1;
      });

    case REMOVE_ITEM:
      let indexRemove = state.elements.findIndex(x => x.id === action.payload);
      return produce(state, draftState => {
        draftState.elements.splice(indexRemove, 1);
      });

    case ADD_ITEM:
      let clone: IPanier = { id: action.payload.id, title: action.payload.title, nb: 1, price: action.payload.price };
      return produce(state, draftState => {
        draftState.elements.push(clone);
      });

    default:
      return state;
  }
};
