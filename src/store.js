import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export function configureApplicationStore() {
  let store = configureStore({
    reducer: rootReducer,
  });

  return store;
}
