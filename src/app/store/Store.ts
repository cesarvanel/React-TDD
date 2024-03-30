import {
  ThunkDispatch,
  configureStore,
  Action,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { rootReducers } from "../reducers/Reducer";
import { AuthUserGateway } from "../../auth/domain/auhtUserGateway";
import { TimeLineGateWay } from "../../timeline/domain/TimeLineGateway";

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
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
}>();
