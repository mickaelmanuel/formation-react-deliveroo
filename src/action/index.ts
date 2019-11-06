import axios from "axios";
import { Dispatch } from "redux";
import { RootObject } from "../Interfaces";

export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_LOADING = "FETCH_DATA_LOADING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";

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
