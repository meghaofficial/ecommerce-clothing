import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action) => {
      state.authInfo = action.payload;
    },
    clearAuthInfo: (state) => {
      state.authInfo = null;
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;
export default authSlice.reducer;
