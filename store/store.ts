import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { cupomsReducer, donationsReducer, placesReducer, userReducer } from './states/slices';

const rootReducer = combineReducers({
  user: userReducer,
  places: placesReducer,
  donations: donationsReducer,
  cupoms: cupomsReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
  preloadedState: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const Store = setupStore;

setupListeners(Store.dispatch);

export type RootState = ReturnType<typeof Store.getState>;
export type AppStore = typeof Store;
export type AppDispatch = typeof Store.dispatch;
