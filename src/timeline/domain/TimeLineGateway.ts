import { GetUserTimeLineResponse } from "../features/thunks/get-user-timeline/GetUserTimeLineResponse";

export interface TimeLineGateWay {
  getUserTimeLine: ({
    userId,
  }: {
    userId: string;
  }) => Promise<GetUserTimeLineResponse>;
}
