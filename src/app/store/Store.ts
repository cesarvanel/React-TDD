/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyAction,
  ThunkDispatch,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { rootReducers } from "../reducers/Reducer";
import { AuthUserGateway } from "../../auth/domain/auhtUserGateway";
import { TimeLineGateWay } from "../../timeline/domain/TimeLineGateway";
import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { FakeTimeLineGateAway } from "../../timeline/infra/time-line-gateway/FakeTimeineGateway";
import { useDispatch, useSelector } from "react-redux";

export interface Dependencies {
  authUserGateway: AuthUserGateway;
  timelineGateway: TimeLineGateWay;
}

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootReducers>
) =>
  configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
    preloadedState,
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootReducers = ReturnType<typeof rootReducers>;

export type RootState = RootReducers;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: any;
  extra: Dependencies;
}>();

const authUserGateway = new FakeAuthUserGAteway();

const timelineGateway = new FakeTimeLineGateAway(1000);

timelineGateway.timeLineByUser.set(authUserGateway.auhtuser, {
  id: "cesar-timeline-id",
  user: "cesar",
  messages: [
    {
      id: "msg1-id",
      text: "hello cesar",
      author: "vanel",
      publishedAt: "2023-05T12:06:00.000Z",
    },
    {
      id: "msg2-id",
      text: "tu fais quoi demain",
      author: "daniel",
      publishedAt: "2023-05T12:04:00.000Z",
    },
  ],
});

export const store = createStore({ authUserGateway, timelineGateway });
