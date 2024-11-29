import { createSelector } from "@reduxjs/toolkit";

const getRoot = (state: { user: any }) => state.user;

export const getUser = createSelector([getRoot], (state) => state);