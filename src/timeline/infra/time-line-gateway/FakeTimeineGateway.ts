import { TimeLineGateWay } from "../../domain/TimeLineGateway";
import { GetUserTimeLineResponse } from "../../features/thunks/get-user-timeline/GetUserTimeLineResponse";

export class FakeTimeLineGateAway implements TimeLineGateWay {
  constructor(private readonly delay = 0) {}
  timeLineByUser = new Map<
    string,
    {
      user: string;
      id: string;
      messages: {
        id: string;
        text: string;
        author: string;
        publishedAt: string;
      }[];
    }
  >();

  getUserTimeLine({
    userId,
  }: {
    userId: string;
  }): Promise<GetUserTimeLineResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const timeline = this.timeLineByUser.get(userId);

        if (!timeline) return reject();

        return resolve({
          timeline,
        });
      }, this.delay);
    });
  }
}
