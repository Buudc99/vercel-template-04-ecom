"use client";
import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
  show: boolean;
}

const initialState: AuthState = {
  show: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleAuth: (state) => {
      state.show = !state.show;
    },
    setAuth: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const {toggleAuth, setAuth} = authSlice.actions;

export default authSlice.reducer;
