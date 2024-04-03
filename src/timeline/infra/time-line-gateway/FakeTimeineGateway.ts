import { TimeLineGateWay } from "../../domain/TimeLineGateway";
import { GetUserTimeLineResponse } from "../../features/thunks/get-user-timeline/GetUserTimeLineResponse";

export class FakeTimeLineGateAway implements TimeLineGateWay {
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
    const timeline = this.timeLineByUser.get(userId);

    if (!timeline) return Promise.reject();

    return Promise.resolve({
      timeline,
    });
  }
}
