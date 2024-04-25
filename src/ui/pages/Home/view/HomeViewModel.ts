import { RootState } from "../../../../app/store/Store";
import { selectAuthUser } from "../../../../auth/feature/AuthSlice";
import { selectMessagesByIds } from "../../../../messages/feature/MessageSlice";
import {
  selectTimelineForUser,
  selectIsUserTimeLoading,
} from "../../../../timeline/features/Timeline.Slice";
import * as timeago from "timeago.js";

export const selectHomeViewModel = (state: RootState) => {
  const authUser = selectAuthUser(state);
  const timeline = selectTimelineForUser(authUser, state);

  const loading = selectIsUserTimeLoading(state);

  if (loading) {
    return {
      timeline: {
        type: "EMTY_TIMELINE_LOADING",
        infos: "loading...",
      },
    };
  }

  if (!timeline) {
    return {
      timeline: {
        type: "NO_TIME_LINE",
      },
    };
  }

  if (timeline.messages.length === 0) {
    return {
      timeline: {
        type: "EMTY_TIMELINE",
        infos: "pas de messages",
      },
    };
  }

  const messages = selectMessagesByIds(timeline.messages, state).map((msg) => {
    return {
      id: msg.id,
      userId: msg.author,
      username: msg.author,
      profilePicture: `http://picsum/photos/200?random=${msg.author}`,
      publishedAt: timeago.format(msg.publishedAt, "my-locale"),
      text: msg.text,
    };
  });

  return {
    timeline: {
      type: "THERE_MESSAGE_TIMELINE",
      messages,
    },
  };
};
