export type AuthAction = {
  checkLoading: string;
  checkAuth: string;
  logout: string;
  registration: string;
  login: string;
};

export const authAction = {
  checkLoading: "checkLoading",
  checkAuth: "checkAuth",
  isCreate: "isCreate",
  logout: "logout",
  registration: "registration",
  login: "login",
};
