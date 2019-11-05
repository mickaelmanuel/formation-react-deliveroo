import { SET_DATA } from "./../../action";

export const initialState = null;

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      let result = Object.assign({}, state, action.payload);
      return result;

    default:
      return state;
  }
};
