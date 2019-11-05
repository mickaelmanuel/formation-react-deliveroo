import { combineReducers } from "redux";
import { dataReducer, dataErrorReducer, dataIsLoadingReducer } from "./dataReducer";
import { panierReducer } from "./panierReducer";
export const reducer = combineReducers({
  data: dataReducer,
  dataHasError: dataErrorReducer,
  dataIsLoading: dataIsLoadingReducer,
  panier: panierReducer
});
