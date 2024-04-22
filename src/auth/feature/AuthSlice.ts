import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/Store";
import { AuthenticateWithGoogleAccount } from "../usecase/AuthenticateWithGoogleAccount";

export interface AuthState {
  authUser?: string;
}

const initalState: AuthState = {
  authUser: undefined,
};

export const AuthSlice = createSlice({
  name: "authSlice",
  initialState: initalState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      AuthenticateWithGoogleAccount.fulfilled,
      (state, action) => {
        state.authUser = action.payload;
      }
    );
  },
});

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authUser !== undefined;

export const selectAuthUser = (state: RootState) => state.auth.authUser ?? "";
