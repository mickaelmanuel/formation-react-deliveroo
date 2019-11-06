import axios from "axios";
import { Dispatch } from "redux";
import { FETCH_DATA_SUCCESS, FETCH_DATA_LOADING, FETCH_DATA_ERROR, IDataActionTypes } from "./types";
import { RootObject } from "../../../Interfaces";

export const fetchDataSuccess = (data: RootObject): IDataActionTypes => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data
  };
};

export const fetchDataLoading = (isLoading: boolean): IDataActionTypes => {
  return {
    type: FETCH_DATA_LOADING,
    payload: isLoading
  };
};

export const fetchDataError = (hasError: boolean): IDataActionTypes => {
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
