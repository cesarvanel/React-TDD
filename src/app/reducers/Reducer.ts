import { combineReducers } from "@reduxjs/toolkit";
import { TimeLineSlice } from "../../timeline/features/Timeline.Slice";
import { MessagesSlice } from "../../messages/feature/MessageSlice";

export const rootReducers = combineReducers({
  timelines: TimeLineSlice.reducer,
  messages: MessagesSlice.reducer,
});
