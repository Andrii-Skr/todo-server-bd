import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  checkAuthAction,
  checkLoadingAction,
  getloginAction,
  getRegistrationAction,
  logoutAction,
} from "../actions/auth-action";
import { AuthRes, UserDto } from "../types";

export type UserAuth = "unknown" | "loggedIn" | "notLoggedIn";

export type UserState = {
  userDto?: UserDto;
  userAuth: UserAuth;
  isloading: boolean;
};

const defaultState: UserState = {
  userDto: { email: "", id: "", isActivated: false },
  userAuth: "unknown",
  isloading: false,
};

export const userAuthReducer = createReducer<UserState>(defaultState, (builder) => {
  builder.addCase(getloginAction, (state, action: PayloadAction<AuthRes>) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = "loggedIn";
    state.userDto = action.payload.user;
  });
  builder.addCase(getRegistrationAction, (state, action: PayloadAction<AuthRes>) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = "loggedIn";
    state.userDto = action.payload.user;
  });
  builder.addCase(logoutAction, (state, action: PayloadAction<AuthRes>) => {
    localStorage.removeItem("token");
    state.userAuth = "notLoggedIn";
    state.userDto = undefined;
  });
  builder.addCase(checkAuthAction, (state, action: PayloadAction<AuthRes>) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = "loggedIn";
    state.userDto = action.payload.user;
    state.isloading = false;
  });
  builder.addCase(checkLoadingAction, (state, action) => {
    state.isloading = true;
  });
});
