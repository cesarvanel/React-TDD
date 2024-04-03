import { createEntityAdapter } from "@reduxjs/toolkit";

export interface Messages {
  id: string;
  text: string;
  author: string;
  publishedAt: string;
}

export const MessagesAdapter = createEntityAdapter<Messages>();
