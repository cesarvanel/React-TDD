import { FakeAuthUserGAteway } from "../../auth/infra/FakeAuthUser";
import { FakeMessageGateway } from "../../messages/infra/FakeMessageGateway";
import { RealDateProvider } from "../../timeline/infra/date-provider/RealDateProvider";
import { FakeTimeLineGateAway } from "../../timeline/infra/time-line-gateway/FakeTimeineGateway";
import { Dependencies, RootReducers, createStore } from "../store/Store";

export const createTestStore = (
  {
    authUserGateway = new FakeAuthUserGAteway(),
    timelineGateway = new FakeTimeLineGateAway(),
    dateProvider = new RealDateProvider(), 
    messageGateway = new FakeMessageGateway()

  }: Partial<Dependencies> = {},
  preloadedState?: Partial<RootReducers>
) =>
  createStore(
    {
      authUserGateway,
      timelineGateway,
      dateProvider, 
      messageGateway
    },
    preloadedState
  );
