import { createEntityAdapter } from "@reduxjs/toolkit";

export interface Timeline {
  id: string;
  user: string;
  messages: string[];
}

export const TimelineAdapter = createEntityAdapter<Timeline>();
