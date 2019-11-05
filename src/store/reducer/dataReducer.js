import { FETCH_DATA_ERROR, FETCH_DATA_LOADING, FETCH_DATA_SUCCESS } from "./../../action";

export const initialState = null;

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export const dataIsLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_LOADING:
      return action.payload;

    default:
      return state;
  }
};

export const dataErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_ERROR:
      return action.payload;

    default:
      return state;
  }
};
