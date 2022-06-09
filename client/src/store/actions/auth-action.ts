import { createAction } from "@reduxjs/toolkit";
import { AuthRes } from "../types";

// export type AuthAction = {
//   checkLoading: string;
//   checkAuth: string;
//   logout: string;
//   registration: string;
//   login: string;
// };

// export const authAction = {
//   checkLoading: "checkLoading",
//   checkAuth: "checkAuth",
//   isCreate: "isCreate",
//   logout: "logout",
//   registration: "registration",
//   login: "login",
// };

export const checkLoadingAction = createAction("checkLoading");
export const checkAuthAction = createAction<AuthRes>("checkAuth");
export const getloginAction = createAction<AuthRes>("login");
export const getRegistrationAction = createAction<AuthRes>("registration");
export const logoutAction = createAction<AuthRes>("logout");
