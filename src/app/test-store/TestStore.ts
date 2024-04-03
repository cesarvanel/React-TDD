import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { FakeTimeLineGateAway } from "../../timeline/infra/time-line-gateway/FakeTimeineGateway";
import { rootReducers } from "../reducers/Reducer";
import { Dependencies, createStore } from "../store/Store";

export const createTestStore = (
  {
    authUserGateway = new FakeAuthUserGAteway(),

    timelineGateway = new FakeTimeLineGateAway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducers>>
) =>
  createStore(
    {
      authUserGateway,
      timelineGateway,
    },
    preloadedState
  );
