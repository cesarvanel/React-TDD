export type PostMessageParams = {
  id: string;
  timelineId: string;
  text: string;
};

export type ExpectedTimeLine = {
  id: string;
  user: string;
  messages: {
    id: string;
    text: string;
    author: string;
    publishedAt: string;
  }[];
};

export type ExpectedPostMessage = {
  id: string;
  timelineId: string;
  text: string;
  author: string;
  publishedAt: string;
};
