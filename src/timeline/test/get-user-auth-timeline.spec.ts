import { describe, it, expect } from "vitest";
import { GetAuthUserTimeLine } from "../usecase/GetAuthUserTimeLine";
import { FakeTimeLineGateAway } from "../infra/time-line-gateway/FakeTimeineGateway";
import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { RootState, createStore } from "../../app/store/Store";
import {
  selectIsUserTimeLoading,
  selectTimelineById,
} from "../features/Timeline.Slice";
import { selectMessage } from "../../messages/feature/MessageSlice";

const authUserGateway = new FakeAuthUserGAteway();

const timelineGateway = new FakeTimeLineGateAway();

const store = createStore({ authUserGateway, timelineGateway });

describe("feature: get a time line when a user is auhtenticated ", () => {
  it("Example: it cesar it authenticated ", async () => {
    // arrange

    givenAuthenticatedUserId("cesar");

    givenExistingTimeLine({
      id: "cesar-timeline-id",
      user: "cesar",
      messages: [
        {
          id: "msg1-id",
          text: "hello cesar",
          author: "vanel",
          publishedAt: "2023-05T12:06:00.000Z",
        },
        {
          id: "msg2-id",
          text: "tu fais quoi demain",
          author: "daniel",
          publishedAt: "2023-05T12:04:00.000Z",
        },
      ],
    });

    //act (when)
    const timelineRetieveing = whenRetrieverAuthenticatedUserTimeLine();

    timelineUserShouldBeLoading(store.getState());

    await timelineRetieveing;

    //then

    thenThereceivingTimeLineShoulBe({
      id: "cesar-timeline-id",
      user: "cesar",
      messages: [
        {
          id: "msg1-id",
          text: "hello cesar",
          author: "vanel",
          publishedAt: "2023-05T12:06:00.000Z",
        },
        {
          id: "msg2-id",
          text: "tu fais quoi demain",
          author: "daniel",
          publishedAt: "2023-05T12:04:00.000Z",
        },
      ],
    });
  });
});

const givenAuthenticatedUserId = (user: string) => {
  authUserGateway.auhtuser = user;
};

const timelineUserShouldBeLoading = (state: RootState) => {
  const isTimelineUserLoading = selectIsUserTimeLoading(state);

  expect(isTimelineUserLoading).toBe(true);
};

const givenExistingTimeLine = (timeline: {
  id: string;
  user: string;
  messages: { id: string; text: string; author: string; publishedAt: string }[];
}) => {
  timelineGateway.timeLineByUser.set("cesar", timeline);
};

const whenRetrieverAuthenticatedUserTimeLine = async () => {
  await store.dispatch(GetAuthUserTimeLine());
};

const thenThereceivingTimeLineShoulBe = (expectedTimeLine: {
  id: string;
  user: string;
  messages: { id: string; text: string; author: string; publishedAt: string }[];
}) => {
  const authUserTimeLine = selectTimelineById(
    expectedTimeLine.id,
    store.getState()
  );
  expect(authUserTimeLine).toEqual({
    id: expectedTimeLine.id,
    user: expectedTimeLine.user,
    messages: expectedTimeLine.messages.map((m) => m.id),
  });

  expectedTimeLine.messages.forEach((msg) => {
    expect(selectMessage(msg.id, store.getState())).toEqual(msg);
  });

  expect(selectIsUserTimeLoading(store.getState())).toBe(false);
};
