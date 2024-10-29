"use client";
import {configureStore} from "@reduxjs/toolkit";
import {themeSlice} from "./Theme";
import {categorySlice} from "./NewsCategory";
import {navSlice} from "./Navigation";
import {searchSlice} from "./Search";
import {filterSlice} from "./Filter";
import {authSlice} from "./Auth";
import {homeSlice} from "./Home";
import {postSlice} from "./Post";
import {commentSlice} from "./Comment";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    news_category: categorySlice.reducer,
    navigation: navSlice.reducer,
    search: searchSlice.reducer,
    filter: filterSlice.reducer,
    auth: authSlice.reducer,
    home: homeSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
