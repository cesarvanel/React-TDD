import { describe, test, expect } from "vitest";
import { stateBuilder } from "../../helpers/test-helper/StateBuilter";
import { createTestStore } from "../../app/test-store/TestStore";
import { AuthenticateWithGoogleAccount } from "../usecase/AuthenticateWithGoogleAccount";
import { FakeAuthUserGAteway } from "../infra/FakeAuthUser";

describe("feature: Login with google Account ", async () => {
  test("Example cesar it authenticated successfuly", async () => {
    // given
    givenAuthenticatedForUserGoogleAccount("cesar");

    //when

    await whenUserAuthenticatedWithGoogle();

    // then

    thenUserShouldBeAuthenticated({ authUser: "cesar" });
  });
});

const authUserGateway = new FakeAuthUserGAteway();

const store = createTestStore({ authUserGateway });

const givenAuthenticatedForUserGoogleAccount = (authUser: string) => {
  authUserGateway.willSucceedForGoogleAuth = authUser;
};

const whenUserAuthenticatedWithGoogle = async () => {
  await store.dispatch(AuthenticateWithGoogleAccount());
};

const thenUserShouldBeAuthenticated = ({ authUser }: { authUser: string }) => {
  const expectedState = stateBuilder().WithAuthUser({ authUser }).build();

  expect(store.getState()).toEqual(expectedState);
};
