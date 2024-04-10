import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
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
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type RootReducers = ReturnType<typeof rootReducers>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: object;
  extra: Dependencies;
}>();

const authUserGateway = new FakeAuthUserGAteway();

const timelineGateway = new FakeTimeLineGateAway(1000);

export const store = createStore({ authUserGateway, timelineGateway });
