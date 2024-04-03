import { describe, expect, test } from "vitest";
import { selectHomeViewModel } from "../view/HomeViewModel";
import { createTestStore } from "../../../../app/test-store/TestStore";

describe("Home view Model", () => {
  test("there no timeline in the store", () => {
    const store = createTestStore();

    const homeViewModel = selectHomeViewModel(store.getState(),);
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
              author: "cesar",
              publishedAt: " 2024-03-03 09:20:00",
              text: "hi maelle",
            },
          },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState());
    expect(homeViewModel).toEqual({
      timeline: {
        type: "THERE_MESSAGE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            userId:"cesar", 
            username:"cesar",
            profilePicture:'http://picsum/photos/200?random=cesar',
            publishedAt: "1 month ago",
            text: "hi maelle",
          },
        ],
      },
    });
  });

  test("there is many message in the timeline ", () => {
    const store = createTestStore(
      {},
      {
        timeLineReducers: {
          ids: ["cesar-timeline-id"],
          entities: {
            "cesar-timeline-id": {
              id: "cesar-timeline-id",
              user: "cesar",
              messages: ["msg1-1", "msg2-2"],
            },
          },
        },
        messages: {
          ids: ["msg1-1", "msg2-2"],
          entities: {
            "msg1-1": {
              id: "msg1-1",
              author: "cesar",
              publishedAt: "2024-04-03 07:20:00",
              text: "hi maelle",
            },
            "msg2-2": {
              id: "msg2-2",
              author: "maelle",
              publishedAt: "2024-04-03 07:40:00",
              text: "comment tu vas ",
            },
           
          },
        },
      }
    );

    const homeViewModel = selectHomeViewModel(store.getState(),);
    expect(homeViewModel).toEqual({
      timeline: {
        type: "THERE_MESSAGE_TIMELINE",
        messages: [
          {
            id: "msg1-1",
            userId:"cesar", 
            username:"cesar",
            profilePicture:'http://picsum/photos/200?random=cesar',
            publishedAt: "4 hours ago",
            text: "hi maelle",
          },
          {
            id: "msg2-2",
            userId:"maelle", 
            username:"maelle",
            profilePicture:'http://picsum/photos/200?random=maelle',
            publishedAt: "4 hours ago",
            text: "comment tu vas ",
          },
        ],
      },
    });
  });
});
