import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/auth/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});
