import { configureStore } from "@reduxjs/toolkit";

import emailReducer from './email/emailSlice';
import pesquisaReducer from './pesquisa';

export const store = configureStore({
  reducer: {
    email: emailReducer,
    pesquisas: pesquisaReducer,
  }
});