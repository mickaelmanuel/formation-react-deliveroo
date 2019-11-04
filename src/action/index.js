export const INCREMENT_ITEM = "INCREMENT_ITEM";
export const DECREMENT_ITEM = "DECREMENT_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const ADD_ITEM = "ADD_ITEM";

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
