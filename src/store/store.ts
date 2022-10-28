import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

export type RootState = ReturnType<typeof reducers>;

export const reducers = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: reducers,
});
