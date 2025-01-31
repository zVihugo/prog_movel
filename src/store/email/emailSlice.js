import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = null;

export const addEmail = createAction('ADD_EMAIL');

export default createReducer(INITIAL_STATE, (builder) => {
  builder
  .addCase(addEmail, (state, action) => action.payload);
});
