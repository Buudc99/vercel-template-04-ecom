"use client";
import {Content} from "@/types";
import {createSlice} from "@reduxjs/toolkit";

interface CategoryState {
  isCategory: string;
  categoryList: Content[];
}

const initialState: CategoryState = {
  isCategory: "",
  categoryList: [],
};

export const categorySlice = createSlice({
  name: "newscategory",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      state.isCategory = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const {setCategory, setCategoryList} = categorySlice.actions;

export default categorySlice.reducer;
