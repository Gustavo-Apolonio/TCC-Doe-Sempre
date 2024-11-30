import { createSelector } from "@reduxjs/toolkit";

const getRoot = (state: { places: any }) => state.places;

export const getPlaces = createSelector([getRoot], (state) => state);