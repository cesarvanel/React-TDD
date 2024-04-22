/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetUserTimeLine = createAsyncThunk(
  "get-user-timeline",

  async (
    params: { userId: string },
    { extra: { timelineGateway }, rejectWithValue }
  ) => {
    try {
      const { timeline } = await timelineGateway.getUserTimeLine({
        userId: params.userId,
      });

      return timeline;
    } catch (error) {
      const err = error as unknown as any;
      return rejectWithValue(err);
    }
  }
  //   {
  //     condition(_, { getState }) {
  //       const isTimelineUserLoading = selectIsUserTimeLoading(getState());

  //       return !isTimelineUserLoading;
  //     },
  //   }
);
