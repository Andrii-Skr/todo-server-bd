import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { authAction } from "../actions/auth-action";
import { AuthRes, UserDto } from "../types";

export type UserState = {
  userDto?: UserDto;
  userAuth: boolean;
  isloading: boolean;
};

const defaultState: UserState = {
  userDto: { email: "", id: "", isActivated: false },
  userAuth: false,
  isloading: true,
};

export const userAuthReducer = createReducer<UserState>(defaultState, (builder) => {
  builder.addCase(authAction.login, (state, action: PayloadAction<AuthRes>) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = true;
    state.userDto = action.payload.user;
  });
  builder.addCase(authAction.registration, (state, action: PayloadAction<AuthRes>) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = true;
    state.userDto = action.payload.user;
  });
  builder.addCase(authAction.logout, (state, action: PayloadAction<AuthRes>) => {
    localStorage.removeItem("token");
    state.userAuth = false;
    state.userDto = undefined;
  });
  builder.addCase(authAction.checkAuth, (state, action: PayloadAction<AuthRes>) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = true;
    state.userDto = action.payload.user;
    state.isloading = false;
  });
  builder.addCase(authAction.checkLoading, (state, action: PayloadAction<AuthRes>) => {
    state.isloading = false;
  });
});
