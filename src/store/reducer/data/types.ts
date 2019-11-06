import { RootObject } from "../../../Interfaces";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_LOADING = "FETCH_DATA_LOADING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

export interface DataState {
  isLoading: boolean;
  hasError: boolean;
  root: RootObject | any;
}

interface IActionDataReducer {
  type: typeof FETCH_DATA_SUCCESS;
  payload: RootObject;
}

interface IActionDataIsLoadingReducer {
  type: typeof FETCH_DATA_LOADING;
  payload: boolean;
}

interface IActionDataErrorReducer {
  type: typeof FETCH_DATA_ERROR;
  payload: boolean;
}

export type IDataActionTypes = IActionDataReducer | IActionDataIsLoadingReducer | IActionDataErrorReducer;
