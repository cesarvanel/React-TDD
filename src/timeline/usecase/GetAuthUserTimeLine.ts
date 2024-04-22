/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectAuthUser } from "../../auth/feature/AuthSlice";
import { selectIsUserTimeLoading } from "../features/Timeline.Slice";

export const GetAuthUserTimeLine = createAsyncThunk(
  "get-auth-user-timeline",

  async (_, { extra: { timelineGateway }, rejectWithValue, getState }) => {
    const authUser = selectAuthUser(getState());
    try {
      const { timeline } = await timelineGateway.getUserTimeLine({
        userId: authUser,
      });

      return timeline;
    } catch (error) {
      const err = error as unknown as any;
      return rejectWithValue(err);
    }
  },
  // {
  //   condition(_, { getState }) {
  //     const isTimelineUserLoading = selectIsUserTimeLoading(getState());

  //     return !isTimelineUserLoading;
  //   },
  // }
);
