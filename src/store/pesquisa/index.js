import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

export const addPesquisa = createAction('ADD_PESQUISA');
export const addPesquisas = createAction('ADD_PESQUISAS');
export const removePesquisa = createAction('REMOVE_PESQUISA');
export const updatePesquisa = createAction('UPDATE_PESQUISA');

export default createReducer(INITIAL_STATE, (build) => {
  build
    .addCase(addPesquisa, (state, action) => {
      const exists = state.some(pesquisa => pesquisa.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    })
    .addCase(addPesquisas, (state, action) => {
      return action.payload;
    })
    .addCase(removePesquisa, (state, action) => {
      return state.filter(item => item.id !== action.payload)
    })
    .addCase(updatePesquisa, (state, action) => {
      return state.map(item => item.id === action.payload.id ? action.payload : item);
    });
});