import { describe, beforeEach, test } from "vitest";
import { createTimeLineFixture, TimelinesFixture } from "./fixture-timeline";
import { AuthFixture, createAuthFixture } from "../../auth/test/fixture-auth";
import { stateBuilderProvider } from "../../helpers/test-helper/StateBuilter";

describe("Feature: post a message on a timeline", async () => {
  let fixture: TimelinesFixture;

  let authFixture: AuthFixture;

  beforeEach(() => {
    const testStateBuilderProvider = stateBuilderProvider();

    fixture.givenNowIs(new Date("2024-05-24"));

    fixture = createTimeLineFixture(testStateBuilderProvider);

    authFixture = createAuthFixture(testStateBuilderProvider);
  });

  test("Example: cesar can  post a message on her empty timeline", async () => {
    // arrange
    authFixture.givenAuthenticatedUserId("cesar");

    fixture.givenTimeline({
      id: "cesar-timeline-id",
      user: "cesar",
      messages: [],
    });

    // act  (when)
    await fixture.whenUserPostMessages({
      id: "msg-id",
      timelineId: "cesar-timeline-id",
      text: "some thing that i love ",
    });

    // then
    fixture.thenTimelineShouldBe({
      id: "cesar-timeline-id",
      user: "cesar",

      messages: [
        {
          id: "msg-id",
          text: "some thing that i love ",
          author: "cesar",
          publishedAt: "2024-04-25",
        },
      ],
    });


    fixture.thenMessageShouldHaveBeenBePosted({
      id: "msg-id",
      timelineId:"cesar-timeline-id",
      text: "some thing that i love ",
      author: "cesar",
      publishedAt: "2024-04-25",
    })
  });
});
