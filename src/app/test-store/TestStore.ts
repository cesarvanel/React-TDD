import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { FakeTimeLineGateAway } from "../../timeline/infra/time-line-gateway/FakeTimeineGateway";
import { Dependencies, RootReducers, createStore } from "../store/Store";

export const createTestStore = (
  {
    authUserGateway = new FakeAuthUserGAteway(),
    timelineGateway = new FakeTimeLineGateAway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<RootReducers>
) =>
  createStore(
    {
      authUserGateway,
      timelineGateway,
    },
    preloadedState
  );
