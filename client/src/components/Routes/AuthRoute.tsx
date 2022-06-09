import Auth from "../Auth/Auth";
import React from "react";

const AuthRoute = ({ isAuth }: { isAuth: boolean }) => {
  return <Auth isAuth={isAuth} />;
};

export default AuthRoute;
