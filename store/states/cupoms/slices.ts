import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICupomTicket {
  descountAmount: number;
  foodQuantity: number;
  clotheQuantity: number;
  name: string;
  active?: boolean;
  id?: number;
}

export const initialState: ICupomTicket[] = [
  {
    descountAmount: 10,
    foodQuantity: 8,
    clotheQuantity: 2,
    name: 'DOEDESC10',
    active: true,
    id: 0,
  },
];

const cupomsSlice = createSlice({
  name: 'cupoms',
  initialState,
  reducers: {
    addCupom(state, action: PayloadAction<ICupomTicket>) {
      const newId = Math.max(-1, ...state.map((cupom) => cupom.id ?? 0)) + 1;
      const currentState = [...state];
      currentState.push({ ...action.payload, active: true, id: newId });

      return [...currentState];
    },
    editCupom(state, action: PayloadAction<ICupomTicket>) {
      const currentState = [...state].map((cupom) => {
        if (cupom.id === action.payload.id) {
          return {
            ...cupom,
            ...action.payload
          };
        }

        return cupom;
      });

      return [...currentState];
    },
    deleteCupom(state, action: PayloadAction<number>) {
      const currentState = [...state].map((cupom) => {
        if (cupom.id === action.payload) {
          return {
            ...cupom,
            active: false,
          };
        }

        return cupom;
      });

      // Object.assign(state, [...currentState]);

      return [...currentState];
    },
    clearState(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { actions, reducer } = cupomsSlice
