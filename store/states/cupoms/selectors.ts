import { createSelector } from "@reduxjs/toolkit";
import { ICupomTicket } from "./slices";

const getRoot = (state: { cupoms: any }) => state.cupoms;

const sortByActivated = (a: ICupomTicket, b: ICupomTicket) => {
  if (a.active === b.active) return 0;

  return a.active ? -1 : 1;
}

export const getCupoms = createSelector([getRoot], (state) => [...state].sort(sortByActivated));
