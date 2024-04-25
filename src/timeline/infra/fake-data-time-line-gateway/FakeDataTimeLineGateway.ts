import { messagesMap, timelinesByUser } from "../../../fake-data/fake-data";
import { TimeLineGateWay } from "../../domain/TimeLineGateway";
import { GetUserTimeLineResponse } from "../../features/thunks/get-user-timeline/GetUserTimeLineResponse";

export class FakeDataTimeLineGateway implements TimeLineGateWay {
  constructor(private readonly delay?: number) {

    this.delay = delay
  }

  getUserTimeLine({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserTimeLineResponse> {
    return new Promise((resolve, reject) => {
      const timeline = timelinesByUser.get(userId);

      if (!timeline) return reject("no timeline");

      const messages = timeline.messages
        .map((msgId) => {
          const message = messagesMap.get(msgId);

          if (!message) return null;

          return {
            id: message.id,
            text: message.text,
            author: message.authorId,
            publishedAt: message.publishedAt.toISOString(),
          };
        })
        .filter(Boolean);

      setTimeout(() => {
       return resolve({
          timeline: {
            id: timeline.id,
            user: timeline.user,
            messages,
          },
        });
      }, this.delay);
    });
  }
}
