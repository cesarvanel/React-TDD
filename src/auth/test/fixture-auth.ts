import { stateBuilderProvider } from "../../helpers/test-helper/StateBuilter";

export const createAuthFixture = (
  testStateBuilderProvider = stateBuilderProvider()
) => {
  return {
    givenAuthenticatedUserId(user: string) {
      testStateBuilderProvider.setState((stateBuilder) => {
        return stateBuilder.WithAuthUser({ authUser: user });
      });
    },
  };
};

export type AuthFixture = ReturnType<typeof createAuthFixture>;
