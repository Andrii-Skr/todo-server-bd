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
import NotFoundRoute from "../Routes/NotFoundRoute";

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
          <Route path="note" element={<NoteListRoute archiveStateDefaulte={false} />} />
          <Route path="archive" element={<NoteListRoute archiveStateDefaulte={true} />} />
        </Route>
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </div>
  );
}

export default App;
