import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
