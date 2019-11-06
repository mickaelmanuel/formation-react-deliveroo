import { combineReducers } from "redux";
import { panierReducer } from "./panier/reducers";
import { dataReducer } from "./data/reducer";

export const reducer = combineReducers({
  data: dataReducer,
  // dataHasError: dataErrorReducer,
  // dataIsLoading: dataIsLoadingReducer,
  panier: panierReducer
});
