import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/store/Store";

export const AuthenticateWithGoogleAccount = createAsyncThunk(
  "auth/authenticate",

  async (_, { extra: { authUserGateway } }) => {
    const authUser = await authUserGateway.authenticateWithGoogleAccount();

    return authUser;
  }
);
