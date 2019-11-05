import axios from "axios";

export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_LOADING = "FETCH_DATA_LOADING";
export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";
export const SET_DATA = "SET_DATA";

export const incrementItem = id => {
  return {
    type: INCREMENT_ITEM,
    payload: id
  };
};

export const decrementItem = id => {
  return {
    type: DECREMENT_ITEM,
    payload: id
  };
};

export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    payload: id
  };
};

export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item
  };
};

export const fetchDataSuccess = datas => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: datas
  };
};

export const fetchDataLoading = isLoading => {
  return {
    type: FETCH_DATA_LOADING,
    payload: isLoading
  };
};

export const fetchDataError = hasError => {
  return {
    type: FETCH_DATA_ERROR,
    payload: hasError
  };
};

export const setData = data => {
  return {
    type: SET_DATA,
    payload: data
  };
};

export const fetchMyData = dispatch => {
  console.log("fetchMyData");

  return async function(dispatch) {
    await axios.get("https://deliveroo-api.now.sh/menu").then(response => {
      console.log("axios get then", response);
      dispatch(setData(response.data));
    });
  };
};
