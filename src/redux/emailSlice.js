import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
  email: null
}

export const emailSlice = createSlice({
  name: 'email',
  initialState: initialValues,
  reducers: {
    reducerSetEmail: (state, action) => {
      state.email = action.payload.email;
    }
  }
});

export const { reducerSetEmail } = emailSlice.actions;

export default emailSlice.reducer;