import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectEmail } from "src/store/store";
import { loginThunk, logoutThunk, registrationThunk } from "src/store/thunk/auth-thunk";
import { AppDispatch } from "src/store/types";
import "./Auth.css";

type ProbsAuth = { isAuth: boolean };
const Auth = ({ isAuth }: ProbsAuth) => {
  const dispatch = useDispatch<AppDispatch>();
  const [login, setLogin] = useState({ email: "test.auth.message@gmail.com", pass: "123qwe" });
  const email = useSelector(selectEmail);
  const navigate = useNavigate();

  return (
    <>
      <div className="auth">
        <h1>{isAuth ? `Hello, your login ${email} ` : "Login plz"}</h1>
        {!isAuth ? (
          <>
            <span>
              <input
                type="text"
                value={login.email}
                onInput={(e) => setLogin({ ...login, email: e.currentTarget.value })}
                placeholder="Enter email"
              />
              <input
                type="text"
                value={login.pass}
                onInput={(e) => setLogin({ ...login, pass: e.currentTarget.value })}
                placeholder="Enter password"
              />
            </span>
            <button
              onClick={(e) => {
                dispatch(loginThunk(login.email, login.pass));
                navigate("/note/list");
              }}
            >
              Login
            </button>
            <button onClick={(e) => dispatch(registrationThunk(login.email, login.pass))}>
              Registration
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                dispatch(logoutThunk());
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Auth;
