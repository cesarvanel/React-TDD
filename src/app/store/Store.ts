import {
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { rootReducers } from "../reducers/Reducer";
import { AuthUserGateway } from "../../auth/domain/auhtUserGateway";
import { TimeLineGateWay } from "../../timeline/domain/TimeLineGateway";
import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { FakeTimeLineGateAway } from "../../timeline/infra/time-line-gateway/FakeTimeineGateway";

interface Dependencies {
  authUserGateway: AuthUserGateway;
  timelineGateway: TimeLineGateWay;
}

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      });
    },
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: any
  extra: Dependencies
}>()


const authUserGateway = new FakeAuthUserGAteway();

const timelineGateway = new FakeTimeLineGateAway();

export const store = createStore({ authUserGateway, timelineGateway });