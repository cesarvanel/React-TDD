import { createAppAsyncThunk } from "../../app/store/Store";

export const GetAuthUserTimeLine = createAppAsyncThunk(
  "get-auth-user-timeline",

  async (_, { extra: { authUserGateway, timelineGateway } }) => {
    const autherUser = authUserGateway.getAuthUser();
    const { timeline } = await timelineGateway.getUserTimeLine({
      userId: autherUser,
    });

    return timeline;
  }
);
