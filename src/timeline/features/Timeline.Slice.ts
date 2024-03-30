import { createSlice } from "@reduxjs/toolkit";
import { GetAuthUserTimeLine } from "../usecase/GetAuthUserTimeLine";

type Message = {
  text: string;
  author: string;
  publishedAt: string;
};

interface TimeLineState {
  user: string;
  messages: Message[];
}

const initialTimeLineState: TimeLineState = {
  user: "cesar",
  messages: [
    {
      text: "hello cesar",
      author: "vanel",
      publishedAt: "2023-05T12:06:00.000Z",
    },
    {
      text: "tu fais quoi demain",
      author: "daniel",
      publishedAt: "2023-05T12:04:00.000Z",
    },
  ],
};

export const TimeLineSlice = createSlice({
  name: "timeline",
  initialState: initialTimeLineState,
  reducers: {},

  extraReducers(builder) {
    console.log(builder, "builder");
    builder.addCase(GetAuthUserTimeLine.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});
