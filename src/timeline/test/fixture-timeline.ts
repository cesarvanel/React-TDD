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
import { Timeline } from "../domain/TimeLine";
import { PostMessages } from "../usecase/PostMessages";
import { ExpectedPostMessage, expectedTimeLine } from "../../types/types";
import { TestDateProvider } from "../infra/test-date-provider/TestDateProvider";
import { FakeMessageGateway } from "../../messages/infra/FakeMessageGateway";

export const createTimeLineFixture = (
  testStateBuilderProvider = stateBuilderProvider()
) => {
  const authUserGateway = new FakeAuthUserGAteway();
  const timelineGateway = new FakeTimeLineGateAway();
  const testDateProvider = new TestDateProvider();
  const messageGateway = new FakeMessageGateway()
  let store: AppStore;

  return {
    givenNowIs(now: Date) {
      testDateProvider.now = now;
    },
    givenExistingRemoteTimeLine(timeline: {
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

    givenTimeline(timeline: Timeline) {
      testStateBuilderProvider.setState((builder) => {
        return builder.withTimeLine(timeline);
      });
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

    async whenUserPostMessages(postMessagesParams: {
      id: string;
      timelineId: string;
      text: string;
    }) {
      store = createTestStore({dateProvider:testDateProvider, messageGateway}, testStateBuilderProvider.getState());

      store.dispatch(PostMessages(postMessagesParams));
    },

    timelineUserShouldBeLoading() {
      const isTimelineUserLoading = selectIsUserTimeLoading(store.getState());

      expect(isTimelineUserLoading).toBe(true);
    },

    thenThereceivingTimeLineShouldBe(expectedTimeLine: expectedTimeLine) {
      this.thenTimelineShouldBe(expectedTimeLine);
    },

    thenTimelineShouldBe(expectedTimeLine: expectedTimeLine) {
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

    thenMessageShouldHaveBeenBePosted(expectedPostMessage:ExpectedPostMessage){

     expect(messageGateway.lastPostedMessage).toEqual(expectedPostMessage)

    }
  };
};

export type TimelinesFixture = ReturnType<typeof createTimeLineFixture>;
