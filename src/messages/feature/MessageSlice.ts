import { createSlice } from "@reduxjs/toolkit";
import { MessagesAdapter } from "../domain/Messages";
import { RootState } from "../../app/store/Store";
import { GetAuthUserTimeLine } from "../../timeline/usecase/GetAuthUserTimeLine";

export const MessagesSlice = createSlice({
  name: "messages",
  initialState: MessagesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAuthUserTimeLine.fulfilled, (state, action) => {
      MessagesAdapter.addMany(state, action.payload.messages);
    });
  },
});

export const selectMessage = (id: string, state: RootState) =>
  MessagesAdapter.getSelectors().selectById(state.messages, id);
