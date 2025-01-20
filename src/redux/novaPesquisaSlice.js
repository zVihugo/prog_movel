import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
  nome: null,
  data: null,
  imagemUri: null
}

export const novaPesquisaSlice = createSlice({
  name: 'novaPesquisa',
  initialState: initialValues,
  reducers: {
    reducerSetNovaPesquisa(state, action) {
      state.nome = action.payload.nome;
      state.data = action.payload.data;
      state.imagemUri = action.payload.imagemUri;
    }
  }
});

export const { reducerSetNovaPesquisa } = novaPesquisaSlice.actions;

export default novaPesquisaSlice.reducer;