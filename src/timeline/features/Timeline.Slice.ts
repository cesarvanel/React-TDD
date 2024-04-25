import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { GetAuthUserTimeLine } from "../usecase/GetAuthUserTimeLine";
import { TimelineAdapter } from "../domain/TimeLine";
import { RootState } from "../../app/store/Store";
import { GetUserTimeLine } from "../usecase/GetUserTimeLine";

export const TimeLineSlice = createSlice({
  name: "timeline",
  initialState: TimelineAdapter.getInitialState({
    loadingTimeLineByUser: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(GetAuthUserTimeLine.fulfilled, GetUserTimeLine.fulfilled),
      (state, action) => {
        TimelineAdapter.addOne(state, {
          id: action.payload.id,
          messages: action.payload.messages.map((m: { id: string }) => m.id),
          user: action.payload.user,
        });
        state.loadingTimeLineByUser = false;
      }
    );

    builder.addMatcher(
      isAnyOf(GetAuthUserTimeLine.pending, GetUserTimeLine.pending),
      (state) => {
        state.loadingTimeLineByUser = true;
      }
    );
  },
});

export const selectTimelineById = (timelineId: string, state: RootState) =>
  TimelineAdapter.getSelectors().selectById(state.timelines, timelineId);

export const selectIsUserTimeLoading = (state: RootState) =>
  state.timelines.loadingTimeLineByUser;

export const selectTimelineForUser = (user: string, state: RootState) => {
  return TimelineAdapter.getSelectors()
    .selectAll(state.timelines)
    .filter((timeline) => timeline.user === user)[0];
};
