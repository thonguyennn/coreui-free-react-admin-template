/* eslint-disable prettier/prettier */
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import reducers from "./reducers";

const reduxMiddleware = [thunk];


const store = createStore(
  reducers,
  applyMiddleware(...reduxMiddleware)
)
export default store