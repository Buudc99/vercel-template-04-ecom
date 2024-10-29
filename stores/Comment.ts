"use client";
import {Comment} from "@/types/DetailContent";
import {createSlice} from "@reduxjs/toolkit";

interface CommentState {
  comment: string;
  firstName: string;
  lastName: string;
  replyComment: "";
  errorComment: string;
  errorReplyComment: string;
  memorized: number[];
  deleteId: number | null;
  updateId: number | null;
}

const initialState: CommentState = {
  comment: "",
  replyComment: "",
  errorComment: "",
  errorReplyComment: "",
  memorized: [],
  firstName: "",
  lastName: "",
  deleteId: null,
  updateId: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setUpdateComment: (state, action) => {
      state.updateId = action.payload;
    },
    setDeleteComment: (state, action) => {
      state.deleteId = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setReplyComment: (state, action) => {
      state.replyComment = action.payload;
    },
    setErrorComment: (state, action) => {
      state.errorComment = action.payload;
    },
    setErrorReplyComment: (state, action) => {
      state.errorReplyComment = action.payload;
    },
    setMemorized: (state, action) => {
      state.memorized.push(action.payload);
    },
  },
});

export const {
  setComment,
  setMemorized,
  setErrorComment,
  setErrorReplyComment,
  setReplyComment,
  setFirstName,
  setLastName,
  setDeleteComment,
  setUpdateComment,
} = commentSlice.actions;

export default commentSlice.reducer;
