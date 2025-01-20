import { configureStore } from "@reduxjs/toolkit";
import emailReducer from './emailSlice';
import novaPesquisaReducer from './novaPesquisaSlice';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    novaPesquisa: novaPesquisaReducer
  }
});