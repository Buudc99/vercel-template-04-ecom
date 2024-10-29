"use client";
import {createSlice} from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
  overlay_loading: boolean;
}

const initialState: ThemeState = {
  theme: "light",
  overlay_loading: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme == "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setOverlayLoading: (state, action) => {
      state.overlay_loading = action.payload;
    },
  },
});

export const {toggleTheme, setOverlayLoading, setTheme} = themeSlice.actions;

export default themeSlice.reducer;
