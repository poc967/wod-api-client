import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export function configureApplicationStore() {
  let store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware],
  });

  return store;
}
