import { combineReducers } from "redux";
import { dataReducer } from "./dataReducer";
import { panierReducer } from "./panierReducer";
export const reducer = combineReducers({
  data: dataReducer,
  panier: panierReducer
});
