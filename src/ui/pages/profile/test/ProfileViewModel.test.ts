import { describe, expect, test } from "vitest";
import { createTestStore } from "../../../../app/test-store/TestStore";
import * as timeago from "timeago.js";
import { stateBuilder } from "../../../../helpers/test-helper/StateBuilter";
import { selectProfileViewModel } from "../view/ProfileViewModel";

describe("profile timeline view Model for vanel user", () => {
  test("there no timeline in the store", () => {
    const store = createTestStore();

    const profileViewModel = selectProfileViewModel("vanel")(store.getState());
    expect(profileViewModel).toEqual({
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

    const profileViewModel = selectProfileViewModel("vanel")(store.getState());
    expect(profileViewModel).toEqual({
      timeline: {
        type: "EMTY_TIMELINE_LOADING",
        infos: "loading...",
      },
    });
  });

  test("there is no messages in the store ", () => {
    const initalState = stateBuilder()
      .withTimeLine({
        id: "vanel-timeline-id",
        user: "vanel",
        messages: [],
      })
      .build();
    const store = createTestStore({}, initalState);

    const profileViewModel = selectProfileViewModel("vanel")(store.getState());
    expect(profileViewModel).toEqual({
      timeline: {
        type: "EMTY_TIMELINE",
        infos: "pas de messages",
      },
    });
  });

  test("there is one message in the timeline ", () => {
    const initalState = stateBuilder()
      .withTimeLine({
        id: "vanel-timeline-id",
        user: "vanel",
        messages: ["msg1-1"],
      })
      .WithMessages([
        {
          id: "msg1-1",
          text: "hi maelle",
          author: "bob",
          publishedAt: " 2024-03-03 09:20:00",
        },
      ])
      .build();
    const store = createTestStore({}, initalState);

    const profileViewModel = selectProfileViewModel("vanel")(store.getState());
    expect(profileViewModel).toEqual({
      timeline: {
        type: "THERE_MESSAGE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            userId: "bob",
            username: "bob",
            profilePicture: "http://picsum/photos/200?random=bob",
            publishedAt: "1 month ago",
            text: "hi maelle",
          },
        ],
      },
    });
  });

  test("there is many message in the timeline ", () => {
    const initalState = stateBuilder()
      .withTimeLine({
        id: "vanel-timeline-id",
        user: "vanel",
        messages: ["msg1-1", "msg2-2"],
      })
      .WithMessages([
        {
          id: "msg1-1",
          author: "vanel",
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

    const profileViewModel = selectProfileViewModel("vanel")(store.getState());
    expect(profileViewModel).toEqual({
      timeline: {
        type: "THERE_MESSAGE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            userId: "vanel",
            username: "vanel",
            profilePicture: "http://picsum/photos/200?random=vanel",
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
