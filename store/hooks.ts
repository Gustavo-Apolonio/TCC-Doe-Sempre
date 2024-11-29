import { TypedUseSelectorHook, useDispatch, UseSelector, useSelector } from 'react-redux';

import { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: UseSelector<RootState> = useSelector;
