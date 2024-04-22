import { describe, it, beforeEach } from "vitest";
import { createTimeLineFixture, TimelinesFixture } from "./fixture-timeline";
import { AuthFixture, createAuthFixture } from "../../auth/test/fixture-auth";
import { stateBuilderProvider } from "../../helpers/test-helper/StateBuilter";


describe("feature: get a time line when a user is authenticated ", () => {


  const  testStateBuilderProvider = stateBuilderProvider()
  let authFixture :AuthFixture
  let fixture :TimelinesFixture;


  beforeEach(() =>{
    authFixture = createAuthFixture(testStateBuilderProvider)
    fixture = createTimeLineFixture(testStateBuilderProvider)
  })
  it("Example: it cesar it authenticated ", async () => {
    // arrange

    authFixture.givenAuthenticatedUserId("cesar");

    fixture.givenExistingTimeLine({
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
    const timelineRetrieving = fixture.whenRetrievingAuthUserTimeLine();

    fixture.timelineUserShouldBeLoading();

    await timelineRetrieving;

    //then

    fixture.thenThereceivingTimeLineShouldBe({
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



