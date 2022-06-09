import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectIsLoading, selectUpdate } from "../../store/store";
import { AppDispatch } from "../../store/types";
import "./App.css";
import { checkAuthThunk } from "src/store/thunk/auth-thunk";
import { notesThunk, statsThunk } from "src/store/thunk/notes-thunk";
import { Route, Routes } from "react-router-dom";
import { logoutAction } from "src/store/actions/auth-action";
import Loading from "../LoadingScreen/Loading";
import AuthRoute from "../Routes/AuthRoute";
import NoteListRoute from "../Routes/NoteListRoute";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);
  const update = useSelector(selectUpdate);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuthThunk());
    } else {
      dispatch({ type: logoutAction });
    }
  }, []);
  useEffect(() => {
    if (isAuth === "loggedIn") {
      dispatch(notesThunk());
      dispatch(statsThunk());
    }
  }, [isAuth, update]);

  if (isLoading) {
    return <Loading />;
  }
  if (isAuth === "unknown") {
    return (
      <div>
        <h1>unknown!!!!</h1>
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!isLoading && <AuthRoute isAuth={isAuth === "loggedIn"} />}>
          <Route
            index
            element={
              <div className="ad">
                <h1>This could be your ad</h1>
              </div>
            }
          />
          <Route path="note" element={<NoteListRoute />} />
          <Route path="archive" element={<NoteListRoute />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
