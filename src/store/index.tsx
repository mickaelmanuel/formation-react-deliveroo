import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk];

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middlewares),
    composeWithDevTools()
  )
);