import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IDonationTicket {
  itemType: number;
  place: string;
  status: string;
}

export const initialState: IDonationTicket[] = [];

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    addDonation(state, action: PayloadAction<IDonationTicket>) {
      const currentState = [...state];
      currentState.push(action.payload);

      Object.assign(state, currentState);
    },
    clearState(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { actions, reducer } = donationsSlice
