import axios from "axios";
import { Dispatch } from "redux";
import { PanierLight } from "../Interfaces";

export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_LOADING = "FETCH_DATA_LOADING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

export const incrementItem = (id: string) => {
  return {
    type: INCREMENT_ITEM,
    payload: id
  };
};

export const decrementItem = (id: string) => {
  return {
    type: DECREMENT_ITEM,
    payload: id
  };
};

export const removeItem = (id: string) => {
  return {
    type: REMOVE_ITEM,
    payload: id
  };
};

export const addItem = (item: PanierLight) => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const fetchDataSuccess = (data: any) => {
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
        dispatch(fetchDataSuccess(response.data));
      })
      .catch(() => dispatch(fetchDataError(true)));
  };
};
