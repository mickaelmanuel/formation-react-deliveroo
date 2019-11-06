import { FETCH_DATA_ERROR, FETCH_DATA_LOADING, FETCH_DATA_SUCCESS } from "../../action";
import { IAction } from "../../Interfaces";

export const initialState = null;

export interface IActionDataReducer extends IAction {
  payload: any;
}

export const dataReducer = (state = initialState, action: IActionDataReducer) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export interface IActionDataIsLoadingReducer extends IAction {
  payload: any;
}

export const dataIsLoadingReducer = (state = initialState, action: IActionDataIsLoadingReducer) => {
  switch (action.type) {
    case FETCH_DATA_LOADING:
      return action.payload;

    default:
      return state;
  }
};

export interface IActionDataErrorReducer extends IAction {
  payload: any;
}

export const dataErrorReducer = (state = initialState, action: IActionDataErrorReducer) => {
  switch (action.type) {
    case FETCH_DATA_ERROR:
      return action.payload;

    default:
      return state;
  }
};
