import { describe, expect, test } from "vitest";
import { selectHomeViewModel } from "../view/HomeViewModel";
import { createTestStore } from "../../../../app/test-store/TestStore";

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

  test("there is no messages in the store ", () => {
    const store = createTestStore(
      {},
      {
        timeLineReducers: {
          ids: ["cesar-timeline-id"],
          entities: {
            "cesar-timeline-id": {
              id: "cesar-timeline-id",
              user: "cesar",
              messages: [],
            },
          },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "EMTY_TIMELINE",
        infos: "pas de messages",
      },
    });
  });

  test("there is one message in the timeline ", () => {
    const store = createTestStore(
      {},
      {
        timeLineReducers: {
          ids: ["cesar-timeline-id"],
          entities: {
            "cesar-timeline-id": {
              id: "cesar-timeline-id",
              user: "cesar",
              messages: ["msg1-1"],
            },
          },
        },
        messages: {
          ids: ["msg1-1"],
          entities: {
            "msg1-1": {
              id: "msg1-1",
              author: "vanel",
              publishedAt: "2024-05-17T10:55.00.000Z",
              text: "hi cesar",
            },
          },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "ONE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            author: "vanel",
            publishedAt: "2024-05-17T10:55.00.000Z",
            text: "hi cesar",
          },
        ],
      },
    });
  });
});
