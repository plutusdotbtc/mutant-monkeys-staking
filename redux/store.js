import {createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from './reducers/rootReducer';
import {createWrapper} from 'next-redux-wrapper';

const initialState = {};

const middleware = [thunk];

const makeStore = context => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const wrapper = createWrapper(makeStore, {debug: true});
