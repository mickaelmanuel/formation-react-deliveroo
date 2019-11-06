import { FETCH_DATA_SUCCESS, FETCH_DATA_LOADING, FETCH_DATA_ERROR, IDataActionTypes, DataState } from "./types";
import { produce } from "immer";

const initialState: DataState = {
  isLoading: false,
  hasError: false
};

export const dataReducer = (state = initialState, action: IDataActionTypes) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return produce(state, draftState => {
        draftState.root = action.payload;
      });

    case FETCH_DATA_LOADING:
      return produce(state, draftState => {
        draftState.isLoading = action.payload;
      });

    case FETCH_DATA_ERROR:
      return produce(state, draftState => {
        draftState.hasError = action.payload;
      });

    default:
      return state;
  }
};
