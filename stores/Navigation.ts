"use client";
import {Category} from "@/types";
import {createSlice} from "@reduxjs/toolkit";

interface navState {
  screenSize: number;
  isMenu: boolean;
  isSearch: boolean;
  currentMenu: string;
  breadcrumb: string;
  menuList: Category[];
}

const initialState: navState = {
  screenSize: 0,
  isMenu: false,
  isSearch: false,
  currentMenu: "",
  breadcrumb: "",
  menuList: [],
};

export const navSlice = createSlice({
  name: "navigation",
  initialState: initialState,
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setSearch: (state, action) => {
      state.isSearch = action.payload;
      state.isMenu = false;
    },
    setScreen: (state, action) => {
      state.screenSize = action.payload;
      state.isMenu = false;
    },
    setToggleMenu: (state) => {
      state.isMenu = !state.isMenu;
    },
    setMenu: (state, action) => {
      state.isMenu = action.payload;
    },
    setCurrentMenu: (state, action) => {
      state.isMenu = action.payload;
    },
    setBreadCrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },
    getBreadCrumb: (state) => {
      const val = state.breadcrumb as any;
      return val;
    },
  },
});

export const {
  setScreen,
  setToggleMenu,
  setSearch,
  setMenu,
  setCurrentMenu,
  setBreadCrumb,
  setMenuList,
  getBreadCrumb,
} = navSlice.actions;

export default navSlice.reducer;
