import { RootState } from "../../../../app/store/Store";
import { selectMessage } from "../../../../messages/feature/MessageSlice";
import { selectTimelineById } from "../../../../timeline/features/Timeline.Slice";

export const selectHomeViewModel = (state: RootState) => {
  const timeline = selectTimelineById("cesar-timeline-id", state);

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

  const message = selectMessage(timeline.messages[0], state);

  return {
    timeline: {
      type: "ONE_TIMELINE",
      messages: [message],
    },
  };
};
