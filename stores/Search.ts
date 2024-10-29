"use client";
import {createSlice} from "@reduxjs/toolkit";

interface SearchState {
  keywords: string;
  returnList: any[];
}

const initialState: SearchState = {
  keywords: "",
  returnList: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearch: (state, action) => {
      state.keywords = action.payload;
    },
    setDataSearchList: (state, action) => {
      state.returnList = action.payload;
    },
  },
});

export const {setDataSearchList, setSearch} = searchSlice.actions;

export default searchSlice.reducer;
