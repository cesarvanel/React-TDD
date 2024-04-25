
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PostMessageParams } from "../../types/types";
import { createAppAsyncThunk } from "../../app/store/Store";
import { Message } from "../../messages/domain/Messages";
import { selectAuthUser } from "../../auth/feature/AuthSlice";


export const PostMessagePending = createAction<Message>("PostMessagePending")


export const PostMessages = createAsyncThunk(
  "user-post-message",

  async (params:PostMessageParams, {extra:{dateProvider, messageGateway },dispatch, getState }) => {

    const authUser = selectAuthUser(getState())
    const message:Message = {
        id: params.id,
        text: params.text,
        author: authUser,
        publishedAt: dateProvider.getNow().toJSON().slice(0,10),
    }

    dispatch(PostMessagePending(message))


    return messageGateway.postMessage({
        ...message, 
        timelineId:params.timelineId, 

    })

  }
);
