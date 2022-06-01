import { createReducer } from "@reduxjs/toolkit";
import { authAction } from "../actions/auth-action";
import { UserDto } from "../types";

//import AuthService from "src/Service/auth-servise";

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
  builder.addCase(authAction.login, (state, action: any) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = true;
    state.userDto = action.payload.user;
  });
  builder.addCase(authAction.registration, (state, action: any) => {
    localStorage.setItem("token", action.payload.accessToken);
    state.userAuth = true;
    state.userDto = action.payload.user;
  });
  builder.addCase(authAction.logout, (state, action: any) => {
    localStorage.removeItem("token");
    state.userAuth = false;
    state.userDto = undefined;
  });
  builder.addCase(authAction.checkAuth, (state, action: any) => {
    localStorage.setItem("token", action.payload.data.accessToken);
    state.userAuth = true;
    state.userDto = action.payload.data.user;
    state.isloading = false;
  });
  builder.addCase(authAction.checkLoading, (state, action: any) => {
    state.isloading = false;
  });
});
