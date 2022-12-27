import { configureStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export function configureApplicationStore() {
  let store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, logger],
  });

  return store;
}
