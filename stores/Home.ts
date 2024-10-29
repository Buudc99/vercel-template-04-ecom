"use client";
import {Content} from "@/types/AllContent";
import {createSlice} from "@reduxjs/toolkit";

interface HomeState {
  content: Content[];
}

const initialState: HomeState = {
  content: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const {setContent} = homeSlice.actions;

export default homeSlice.reducer;
