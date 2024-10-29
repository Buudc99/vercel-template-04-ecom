"use client";
import {Content, Reaction} from "@/types";
import {ContentDetail} from "@/types/DetailContent";
import {createSlice} from "@reduxjs/toolkit";

interface PostState {
  detail: ContentDetail | null;
  detail_only_reaction: ContentDetail | null;
  detail_only_comment: ContentDetail | null;
  detail_id: string | null;
  relatedPost: Content[];
  reactions: any[];
  reactions_static: any[];
}

const initialState: PostState = {
  detail: null,
  detail_only_reaction: null,
  detail_only_comment: null,
  detail_id: null,
  relatedPost: [],
  reactions: [],
  reactions_static: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPostDetail: (state, action) => {
      state.detail = action.payload;
    },
    setPostDetailOnlyReaction: (state, action) => {
      state.detail_only_reaction = action.payload;
    },
    setPostDetailOnlyComment: (state, action) => {
      state.detail_only_comment = action.payload;
    },
    setPostDetailId: (state, action) => {
      state.detail_id = action.payload;
    },
    setPostRelated: (state, action) => {
      state.relatedPost = action.payload;
    },
    setReactions: (state, action) => {
      state.reactions = action.payload;
    },
    setReactionsStatic: (state, action) => {
      state.reactions_static = action.payload;
    },
  },
});

export const {
  setPostDetail,
  setPostDetailId,
  setPostRelated,
  setPostDetailOnlyReaction,
  setReactionsStatic,
  setReactions,
  setPostDetailOnlyComment,
} = postSlice.actions;

export default postSlice.reducer;
