import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPlaces {
  label: string;
  value: number;
}

export const initialState: IPlaces[] = [
  {
    label: "Av. Belmira Marin",
    value: 0,
  },
  {
    label: "Rua José Campos",
    value: 1,
  },
  {
    label: "Av. Brasil",
    value: 2,
  },
  {
    label: "Av. Paulista",
    value: 3,
  },
  {
    label: "Viela Campos de Jorge",
    value: 4,
  },
  {
    label: "Passagem Villa Jardins",
    value: 5,
  },
];

const placesSlice = createSlice({
  name: 'places',
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

export const { actions, reducer } = placesSlice
