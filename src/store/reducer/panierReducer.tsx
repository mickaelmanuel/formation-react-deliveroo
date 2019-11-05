import { INCREMENT_ITEM, DECREMENT_ITEM, REMOVE_ITEM, ADD_ITEM } from "../../action";
import { produce } from "immer";
import { Panier } from "../../Interfaces";
export const initialState: Array<Panier> = [];

const initProduit: Panier = { id: "", title: "", nb: 1, price: 0.0 };

export const panierReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_ITEM:
      let index = state.findIndex(x => x.id === action.payload);
      return produce(state, draftState => {
        draftState[index].nb = state[index].nb + 1;
      });

    case DECREMENT_ITEM:
      let indexDecrement = state.findIndex(x => x.id === action.payload);

      return produce(state, draftState => {
        draftState[indexDecrement].nb = state[indexDecrement].nb - 1;
      });

    case REMOVE_ITEM:
      let indexRemove = state.findIndex(x => x.id === action.payload);
      return produce(state, draftState => {
        draftState.splice(indexRemove, 1);
      });

    case ADD_ITEM:
      let clone = { ...initProduit };
      clone.id = action.payload.id;
      clone.title = action.payload.title;
      clone.price = action.payload.price;

      return produce(state, draftState => {
        draftState.push(clone);
      });

    default:
      return state;
  }
};
