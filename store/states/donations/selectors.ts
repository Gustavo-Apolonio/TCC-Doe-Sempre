import { createSelector } from "@reduxjs/toolkit";

const getRoot = (state: { donations: any }) => state.donations;

export const getDonations = createSelector([getRoot], (state) => state);