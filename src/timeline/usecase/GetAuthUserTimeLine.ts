import { createAppAsyncThunk } from "../../app/store/Store";

export const GetAuthUserTimeLine = createAppAsyncThunk(
  "get-auth-user-timeline",

  async (
    _,
    { extra: { authUserGateway, timelineGateway }, rejectWithValue }
  ) => {
    const autherUser = authUserGateway.getAuthUser();
    try {
      const { timeline } = await timelineGateway.getUserTimeLine({
        userId: autherUser,
      });

      return timeline;
    } catch (error) {
      const err = error as object;
      return rejectWithValue(err);
    }
  }
);
