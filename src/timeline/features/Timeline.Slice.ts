import { createSlice } from "@reduxjs/toolkit";
import { GetAuthUserTimeLine } from "../usecase/GetAuthUserTimeLine";
import { TimelineAdapter } from "../domain/TimeLine";
import { RootState } from "../../app/store/Store";

export const TimeLineSlice = createSlice({
  name: "timeline",
  initialState: TimelineAdapter.getInitialState({
    loadingTimeLineByUser: false,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAuthUserTimeLine.fulfilled, (state, action) => {
      TimelineAdapter.addOne(state, {
        id: action.payload.id,
        messages: action.payload.messages.map((m: { id: string }) => m.id),
        user: action.payload.user,
      });
      state.loadingTimeLineByUser = false;
    });

    builder.addCase(GetAuthUserTimeLine.pending, (state) => {
      state.loadingTimeLineByUser = true;
    });
  },
});

export const selectTimelineById = (timelineId: string, state: RootState) =>
  TimelineAdapter.getSelectors().selectById(state.timeLineReducers, timelineId);

export const selectIsUserTimeLoading = (state: RootState) =>
  state.timeLineReducers.loadingTimeLineByUser;
