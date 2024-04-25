import { describe, it, beforeEach } from "vitest";
import { createTimeLineFixture, TimelinesFixture } from "./fixture-timeline";



describe("feature: retrieving user profile ", () => {

  let fixture:TimelinesFixture; 

  beforeEach(() =>{

    fixture = createTimeLineFixture()
  })
  it("Example: we are on vanel profile ", async () => {
    // arrange

    fixture.givenExistingRemoteTimeLine({
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
    const timelineRetrieving = fixture.whenRetrievingUserTimeLine("vanel");

    fixture.timelineUserShouldBeLoading();

    await timelineRetrieving;

    //then

    fixture.thenThereceivingTimeLineShouldBe({
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

