import axios from "axios";
import { Dispatch } from "redux";
import { IPanierLight, RootObject } from "../Interfaces";

export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_LOADING = "FETCH_DATA_LOADING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

interface IncrementItemAction {
  type: typeof INCREMENT_ITEM;
  payload: string;
}

interface DecrementItemAction {
  type: typeof DECREMENT_ITEM;
  payload: string;
}

interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: string;
}

interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: IPanierLight;
}

export type ItemActionTypes = IncrementItemAction | RemoveItemAction | DecrementItemAction | AddItemAction;

export const incrementItem = (id: string): ItemActionTypes => {
  return {
    type: INCREMENT_ITEM,
    payload: id
  };
};

export const decrementItem = (id: string): ItemActionTypes => {
  return {
    type: DECREMENT_ITEM,
    payload: id
  };
};

export const removeItem = (id: string): ItemActionTypes => {
  return {
    type: REMOVE_ITEM,
    payload: id
  };
};

export const addItem = (item: IPanierLight): ItemActionTypes => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const fetchDataSuccess = (data: RootObject) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

export const fetchDataLoading = (isLoading: boolean) => {
  return {
    type: FETCH_DATA_LOADING,
    payload: isLoading
  };
};

export const fetchDataError = (hasError: boolean) => {
  return {
    type: FETCH_DATA_ERROR,
    payload: hasError
  };
};

export const fetchMyData = () => {
  return function(dispatch: Dispatch) {
    dispatch(fetchDataLoading(true));

    axios
      .get("https://deliveroo-api.now.sh/menu")
      .then(response => {
        dispatch(fetchDataLoading(false));
        dispatch(fetchDataSuccess(response.data as RootObject));
      })
      .catch(() => dispatch(fetchDataError(true)));
  };
};
