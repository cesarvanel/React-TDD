export interface GetUserTimeLineResponse {
  timeline: {
    user: string;
    messages: { text: string; author: string; publishedAt: string }[];
  };
}
