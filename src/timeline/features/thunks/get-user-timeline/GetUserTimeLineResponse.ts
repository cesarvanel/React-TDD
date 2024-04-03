export interface GetUserTimeLineResponse {
  timeline: {
    id: string;
    user: string;
    messages: {
      id: string;
      text: string;
      author: string;
      publishedAt: string;
    }[];
  };
}
