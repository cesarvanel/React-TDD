import { describe, it, expect } from "vitest";
import { GetAuthUserTimeLine } from "../usecase/GetAuthUserTimeLine";
import { FakeTimeLineGateAway } from "../infra/time-line-gateway/FakeTimeineGateway";
import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { createStore } from "../../app/store/Store";

const authUserGateway = new FakeAuthUserGAteway();

const timelineGateway = new FakeTimeLineGateAway();

const store = createStore({ authUserGateway, timelineGateway });

describe("feature: get a time line when a user is auhtenticated ", () => {
  it("Example: it cesar it authenticated ", async () => {
    // arrange

    givenAuthenticatedUserId("cesar");

    givenExistingTimeLine({
      user: "cesar",
      messages: [
        {
          text: "hello cesar",
          author: "vanel",
          publishedAt: "2023-05T12:06:00.000Z",
        },
        {
          text: "tu fais quoi demain",
          author: "daniel",
          publishedAt: "2023-05T12:04:00.000Z",
        },
      ],
    });

    //act (when)
    await whenRetrieverAuthenticatedUserTimeLine();

    //then

    thenThereceivingTimeLineShoulBe({
      user: "cesar",
      messages: [
        {
          text: "hello cesar",
          author: "vanel",
          publishedAt: "2023-05T12:06:00.000Z",
        },
        {
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

const givenExistingTimeLine = (timeline: {
  user: string;
  messages: { text: string; author: string; publishedAt: string }[];
}) => {
  timelineGateway.timeLineByUser.set("vanel", timeline);
};

const whenRetrieverAuthenticatedUserTimeLine = async () => {
  await store.dispatch(GetAuthUserTimeLine());
};

const thenThereceivingTimeLineShoulBe = (expectedTimeLine: {
  user: string;
  messages: { text: string; author: string; publishedAt: string }[];
}) => {
  const authUserTimeLine = store.getState().timeLineReducers;
  expect(authUserTimeLine).toEqual(expectedTimeLine);
};
