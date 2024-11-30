import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: any = {
  name: null,
  document: null,
  birthdate: null,
  mobileNumber: null,
  email: null,
  city: null,
  uf: null,
  isDonor: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<any>) {
      Object.assign(state, action.payload);
    },
    clearState(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { actions, reducer } = userSlice
