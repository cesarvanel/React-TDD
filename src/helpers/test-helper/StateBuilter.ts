import {
  createAction,
  createReducer,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { rootReducers } from "../../app/reducers/Reducer";
import { RootState } from "../../app/store/Store";
import { Timeline, TimelineAdapter } from "../../timeline/domain/TimeLine";
import { Message, MessagesAdapter } from "../../messages/domain/Messages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const action = createAction("") as any;

const initalState = rootReducers(undefined, action);

const withTimeLine = createAction<Timeline>("withTimeLine");

const TimelineLoading = createAction<{ loadingTimeLineByUser: boolean }>(
  "TimelineLoading"
);

const TimelineisNotLoading = createAction<{ loadingTimeLineByUser: boolean }>(
  "TimelineisNotLoading"
);

const WithOneMessage = createAction<Message[]>("WithOneMessage");

const WithMessages = createAction<Message[]>("WithMessages");

const reducer = createReducer(initalState, (builder) => {
  builder.addCase(withTimeLine, (state, action) => {
    TimelineAdapter.addOne(state.timelines, action.payload);
  });

  builder.addCase(WithOneMessage, (state, action) => {
    MessagesAdapter.addMany(state.messages, action.payload);
  });

  builder.addCase(TimelineLoading, (state) => {
    state.timelines.loadingTimeLineByUser = true;
  });

  builder.addCase(TimelineisNotLoading, (state) => {
    state.timelines.loadingTimeLineByUser = false;
  });

  builder.addCase(WithMessages, (state, action) => {
    MessagesAdapter.addMany(state.messages, action.payload);
  });
});

export const stateBuilder = (baseState = initalState) => {
  const reduce = <P>(actionCreator: ActionCreatorWithPayload<P>) => {
    return (payload: P) => {
      return stateBuilder(reducer(baseState, actionCreator(payload)));
    };
  };
  return {
    withTimeLine: reduce(withTimeLine),
    TimelineLoading: reduce(TimelineLoading),
    TimelineisNotLoading: reduce(TimelineisNotLoading),
    WithMessages: reduce(WithMessages),
    build: (): RootState => {
      return baseState;
    },
  };
};
