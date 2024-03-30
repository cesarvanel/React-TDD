import { combineReducers } from "@reduxjs/toolkit";
import { TimeLineSlice } from "../../timeline/features/Timeline.Slice";

export const rootReducers = combineReducers({
  timeLineReducers: TimeLineSlice.reducer,
});
