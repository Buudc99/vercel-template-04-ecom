"use client";

import {Content} from "@/types";
import {createSlice} from "@reduxjs/toolkit";

interface FilterState {
  key: "all" | "premium" | "free";
  newsList: Content[];
}

const initialState: FilterState = {
  key: "all",
  newsList: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    setFilterKey: (state, action) => {
      state.key = action.payload;
    },
    setFilterList: (state, action) => {
      state.newsList = action.payload;
    },
  },
});

export const {setFilterKey, setFilterList} = filterSlice.actions;

export default filterSlice.reducer;
