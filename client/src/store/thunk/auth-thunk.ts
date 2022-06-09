import { Action, ThunkAction } from "@reduxjs/toolkit";
import AuthService from "src/api/auth-api";
import {
  checkAuthAction,
  getloginAction,
  getRegistrationAction,
  logoutAction,
} from "../actions/auth-action";
import { UserState } from "../reducers/userAuthReducer";

export const loginThunk =
  (email: string, pass: string): ThunkAction<void, UserState, unknown, Action> =>
  async (dispatch) => {
    try {
      dispatch({ type: "loading" });
      const response = await AuthService.login(email, pass);
      dispatch({ type: getloginAction, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const registrationThunk =
  (email: string, pass: string): ThunkAction<void, UserState, unknown, Action> =>
  async (dispatch) => {
    try {
      dispatch({ type: "loading" });
      const response = await AuthService.registration(email, pass);
      dispatch({ type: getRegistrationAction, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

export const logoutThunk =
  (): ThunkAction<void, UserState, unknown, Action> => async (dispatch) => {
    try {
      //dispatch({ type: "loading" });
      const response = await AuthService.logout();
      dispatch({ type: logoutAction, payload: response });
    } catch (error) {
      console.log(error);
    }
  };

export const checkAuthThunk =
  (): ThunkAction<void, UserState, unknown, Action> => async (dispatch) => {
    try {
      dispatch({ type: "checkLoading" });
      const response = await AuthService.checkAuth();
      dispatch({ type: checkAuthAction, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
