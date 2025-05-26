import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserDetails: (state, action) => {
      state.user = { ...action?.payload };
      state.isLoggedIn = true;
    },
    clearUserDetails: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { addUserDetails, clearUserDetails } = authSlice.actions;
export default authSlice.reducer;
