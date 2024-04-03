import { RootState } from "../../../../app/store/Store";
import { selectMessagesByIds } from "../../../../messages/feature/MessageSlice";
import { selectTimelineById } from "../../../../timeline/features/Timeline.Slice";
import * as timeago from 'timeago.js';


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

  const messages = selectMessagesByIds(timeline.messages, state).map((msg) =>{
    return {
      id:msg.id,
      userId:msg.author, 
      username:msg.author,
      profilePicture:`http://picsum/photos/200?random=${msg.author}`,
      publishedAt:timeago.format(msg.publishedAt, 'my-locale'),
      text: msg.text,
    }
  })

  return {
    timeline: {
      type: "THERE_MESSAGE_TIMELINE",
      messages,
    },
  };
};
