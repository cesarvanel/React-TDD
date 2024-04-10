import { createEntityAdapter } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  text: string;
  author: string;
  publishedAt: string;
}

export const MessagesAdapter = createEntityAdapter<Message>();
