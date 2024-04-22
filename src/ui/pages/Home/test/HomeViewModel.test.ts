import { describe, expect, test } from "vitest";
import { selectHomeViewModel } from "../view/HomeViewModel";
import { createTestStore } from "../../../../app/test-store/TestStore";
import * as timeago from "timeago.js";
import { stateBuilder } from "../../../../helpers/test-helper/StateBuilter";

const stateBuilderWithAuthenticated = stateBuilder().WithAuthUser({
  authUser: "cesar",
});

describe("Home view Model", () => {
  test("there no timeline in the store", () => {
    const store = createTestStore();

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "NO_TIME_LINE",
      },
    });
  });

  test("timeline Loading ", () => {
    const initalState = stateBuilder()
      .TimelineLoading({
        loadingTimeLineByUser: true,
      })
      .build();
    const store = createTestStore({}, initalState);

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "EMTY_TIMELINE_LOADING",
        infos: "loading...",
      },
    });
  });

  test("there is no messages in the store ", () => {
    const initalState = stateBuilderWithAuthenticated
      .withTimeLine({
        id: "cesar-timeline-id",
        user: "cesar",
        messages: [],
      })
      .build();
    const store = createTestStore({}, initalState);

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "EMTY_TIMELINE",
        infos: "pas de messages",
      },
    });
  });

  test("there is one message in the timeline ", () => {
    const initalState = stateBuilderWithAuthenticated
      .withTimeLine({
        id: "cesar-timeline-id",
        user: "cesar",
        messages: ["msg1-1"],
      })
      .WithMessages([
        {
          id: "msg1-1",
          text: "hi maelle",
          author: "cesar",
          publishedAt: " 2024-03-03 09:20:00",
        },
      ])
      .build();
    const store = createTestStore({}, initalState);

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "THERE_MESSAGE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            userId: "cesar",
            username: "cesar",
            profilePicture: "http://picsum/photos/200?random=cesar",
            publishedAt: "1 month ago",
            text: "hi maelle",
          },
        ],
      },
    });
  });

  test("there is many message in the timeline ", () => {
    const initalState = stateBuilderWithAuthenticated
      .withTimeLine({
        id: "cesar-timeline-id",
        user: "cesar",
        messages: ["msg1-1", "msg2-2"],
      })
      .WithMessages([
        {
          id: "msg1-1",
          author: "cesar",
          publishedAt: "2024-04-03 07:20:00",
          text: "hi maelle",
        },
        {
          id: "msg2-2",
          author: "maelle",
          publishedAt: "2024-04-03 07:40:00",
          text: "comment tu vas ",
        },
      ])
      .build();
    const store = createTestStore({}, initalState);

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "THERE_MESSAGE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            userId: "cesar",
            username: "cesar",
            profilePicture: "http://picsum/photos/200?random=cesar",
            publishedAt: timeago.format("2024-04-03 07:20:00", "my-locale"),
            text: "hi maelle",
          },
          {
            id: "msg2-2",
            userId: "maelle",
            username: "maelle",
            profilePicture: "http://picsum/photos/200?random=maelle",
            publishedAt: timeago.format("2024-04-03 07:40:00", "my-locale"),
            text: "comment tu vas ",
          },
        ],
      },
    });
  });
});
