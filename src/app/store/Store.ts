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
import { FakeAuthUserGAtewayWithFakeData } from "../../auth/infra/FakeAuthUser";
import { useDispatch, useSelector } from "react-redux";
import { FakeDataTimeLineGateway } from "../../timeline/infra/fake-data-time-line-gateway/FakeDataTimeLineGateway";
import { RealDateProvider } from "../../timeline/infra/date-provider/RealDateProvider";
import { DateProvider } from "../../timeline/domain/DateProvider";
import { MessageGateway } from "../../messages/domain/MessageGateway";
import { FakeMessageGateway } from "../../messages/infra/FakeMessageGateway";

export interface Dependencies {
  authUserGateway: AuthUserGateway;
  timelineGateway: TimeLineGateWay;
  messageGateway:MessageGateway;
  dateProvider:DateProvider
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

const authUserGateway = new FakeAuthUserGAtewayWithFakeData();


const dateProvider = new RealDateProvider()

const messageGateway = new FakeMessageGateway()

const timelineGateway = new FakeDataTimeLineGateway(1000);


export const store = createStore({ authUserGateway, timelineGateway,messageGateway, dateProvider});
