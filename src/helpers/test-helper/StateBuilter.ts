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

const initialState = rootReducers(undefined, action);

const withTimeLine = createAction<Timeline>("withTimeLine");

const TimelineLoading = createAction<{ loadingTimeLineByUser: boolean }>(
  "TimelineLoading"
);

const TimelinesNotLoading = createAction<{ loadingTimeLineByUser: boolean }>(
  "TimelinesNotLoading"
);

const WithOneMessage = createAction<Message[]>("WithOneMessage");

const WithMessages = createAction<Message[]>("WithMessages");

const WithAuthUser = createAction<{ authUser: string }>("WithAuthUser");

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withTimeLine, (state, action) => {
      TimelineAdapter.addOne(state.timelines, action.payload);
    })
    .addCase(WithOneMessage, (state, action) => {
      MessagesAdapter.addMany(state.messages, action.payload);
    })
    .addCase(TimelineLoading, (state) => {
      state.timelines.loadingTimeLineByUser = true;
    })
    .addCase(TimelinesNotLoading, (state) => {
      state.timelines.loadingTimeLineByUser = false;
    })
    .addCase(WithMessages, (state, action) => {
      MessagesAdapter.addMany(state.messages, action.payload);
    })
    .addCase(WithAuthUser, (state, action) => {
      state.auth.authUser = action.payload.authUser;
    });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce = <P>(actionCreator: ActionCreatorWithPayload<P>) => {
    return (payload: P) => {
      return stateBuilder(reducer(baseState, actionCreator(payload)));
    };
  };
  return {
    withTimeLine: reduce(withTimeLine),
    TimelineLoading: reduce(TimelineLoading),
    TimelinesNotLoading: reduce(TimelinesNotLoading),
    WithMessages: reduce(WithMessages),
    WithAuthUser: reduce(WithAuthUser),
    build: (): RootState => {
      return baseState;
    },
  };
};

export const stateBuilderProvider = () => {
  let builder = stateBuilder();

  return {
    getState() {
      return builder.build();
    },

    setState(updateFn: (_builder: StateBuilderType) => StateBuilderType) {
      builder = updateFn(builder);
    },
  };
};

export type StateBuilderType = ReturnType<typeof stateBuilder>;

export type stateBuilderProviderType = ReturnType<typeof stateBuilderProvider>;
