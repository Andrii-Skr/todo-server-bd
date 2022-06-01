import { ThunkAction } from "@reduxjs/toolkit";
import AuthService from "src/Service/auth-servise";
import { authAction } from "../actions/auth-action";
import { UserState } from "../reducers/userAuthReducer";

export const loginThunk =
  (email: string, pass: string): ThunkAction<void, UserState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: "loading" });
      const response = await AuthService.login(email, pass);
      dispatch({ type: authAction.login, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const registrationThunk =
  (email: string, pass: string): ThunkAction<void, UserState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: "loading" });
      const response = await AuthService.registration(email, pass);
      dispatch({ type: authAction.registration, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const logoutThunk = (): ThunkAction<void, UserState, unknown, any> => async (dispatch) => {
  try {
    dispatch({ type: "loading" });
    const response = await AuthService.logout();
    dispatch({ type: authAction.logout, payload: response });
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthThunk =
  (): ThunkAction<void, UserState, unknown, any> => async (dispatch) => {
    try {
      const response = await AuthService.checkAuth();
      dispatch({ type: authAction.checkAuth, payload: response });
    } catch (error) {
      console.log(error);
    }
  };
