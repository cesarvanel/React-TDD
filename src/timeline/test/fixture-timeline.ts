import { expect } from "vitest";
import { AppStore } from "../../app/store/Store";
import { createTestStore } from "../../app/test-store/TestStore";
import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import {
  stateBuilder,
  stateBuilderProvider,
} from "../../helpers/test-helper/StateBuilter";
import { selectIsUserTimeLoading } from "../features/Timeline.Slice";
import { FakeTimeLineGateAway } from "../infra/time-line-gateway/FakeTimeineGateway";
import { GetUserTimeLine } from "../usecase/GetUserTimeLine";
import { GetAuthUserTimeLine } from "../usecase/GetAuthUserTimeLine";

export const createTimeLineFixture = (
  testStateBuilderProvider = stateBuilderProvider()
) => {
  const authUserGateway = new FakeAuthUserGAteway();
  const timelineGateway = new FakeTimeLineGateAway();
  let store: AppStore;

  return {
    givenExistingTimeLine(timeline: {
      id: string;
      user: string;
      messages: {
        id: string;
        text: string;
        author: string;
        publishedAt: string;
      }[];
    }) {
      timelineGateway.timeLineByUser.set(timeline.user, timeline);
    },

    async whenRetrievingUserTimeLine(userId: string) {
      store = createTestStore(
        {
          authUserGateway,
          timelineGateway,
        },
        testStateBuilderProvider.getState()
      );
      await store.dispatch(GetUserTimeLine({ userId }));
    },

    async whenRetrievingAuthUserTimeLine() {
        store = createTestStore(
          {
            authUserGateway,
            timelineGateway,
          },
          testStateBuilderProvider.getState()
        );
        await store.dispatch(GetAuthUserTimeLine());
      },

    timelineUserShouldBeLoading() {
      const isTimelineUserLoading = selectIsUserTimeLoading(store.getState());

      expect(isTimelineUserLoading).toBe(true);
    },

    thenThereceivingTimeLineShouldBe(expectedTimeLine: {
      id: string;
      user: string;
      messages: {
        id: string;
        text: string;
        author: string;
        publishedAt: string;
      }[];
    }) {
        
      const isLoading = selectIsUserTimeLoading(store.getState());

      const expectedState = stateBuilder(testStateBuilderProvider.getState())
        .withTimeLine({
          id: expectedTimeLine.id,
          user: expectedTimeLine.user,
          messages: expectedTimeLine.messages.map((m) => m.id),
        })
        .WithMessages(expectedTimeLine.messages)
        .TimelinesNotLoading({ loadingTimeLineByUser: isLoading })
        .build();

      expect(store.getState()).toEqual(expectedState);
    },
  };
};

export type TimelinesFixture = ReturnType<typeof createTimeLineFixture>;
