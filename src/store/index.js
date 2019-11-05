import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";

const devtool =
  process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = [thunk];

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middlewares),
    devtool
  )
);
