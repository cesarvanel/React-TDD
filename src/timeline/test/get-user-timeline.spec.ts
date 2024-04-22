import { describe, it, expect } from "vitest";
import { FakeTimeLineGateAway } from "../infra/time-line-gateway/FakeTimeineGateway";
import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { RootState, createStore, AppStore } from "../../app/store/Store";
import { selectIsUserTimeLoading } from "../features/Timeline.Slice";
import { stateBuilder } from "../../helpers/test-helper/StateBuilter";
import { GetUserTimeLine } from "../usecase/GetUserTimeLine";

const authUserGateway = new FakeAuthUserGAteway();

const timelineGateway = new FakeTimeLineGateAway();

let store: AppStore;

const testStateBuilder = stateBuilder();

describe("feature: retrieving user profile ", () => {
  it("Example: we are on vanel profile ", async () => {
    // arrange

    givenExistingTimeLine({
      id: "vanel-timeline-id",
      user: "vanel",
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
    const timelineRetieveing = whenRetrievingUserTimeLine("vanel");

    timelineUserShouldBeLoading(store.getState());

    await timelineRetieveing;

    //then

    thenThereceivingTimeLineShoulBe({
      id: "vanel-timeline-id",
      user: "vanel",
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

const timelineUserShouldBeLoading = (state: RootState) => {
  const isTimelineUserLoading = selectIsUserTimeLoading(state);

  expect(isTimelineUserLoading).toBe(true);
};

const givenExistingTimeLine = (timeline: {
  id: string;
  user: string;
  messages: { id: string; text: string; author: string; publishedAt: string }[];
}) => {
  timelineGateway.timeLineByUser.set(timeline.user, timeline);
};

const whenRetrievingUserTimeLine = async (userId: string) => {
  store = createStore(
    {
      authUserGateway,
      timelineGateway,
    },
    testStateBuilder.build()
  );
  await store.dispatch(GetUserTimeLine({ userId }));
};

const thenThereceivingTimeLineShoulBe = (expectedTimeLine: {
  id: string;
  user: string;
  messages: { id: string; text: string; author: string; publishedAt: string }[];
}) => {
  const isLoading = selectIsUserTimeLoading(store.getState());
  const expectedState = stateBuilder()
    .withTimeLine({
      id: expectedTimeLine.id,
      user: expectedTimeLine.user,
      messages: expectedTimeLine.messages.map((m) => m.id),
    })
    .WithMessages(expectedTimeLine.messages)
    .TimelineisNotLoading({ loadingTimeLineByUser: isLoading })
    .build();

  expect(store.getState()).toEqual(expectedState);
};
