import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectIsLoading, selectUpdate } from "../../store/store";
import { AppDispatch } from "../../store/types";
import "./App.css";
import { checkAuthThunk } from "src/store/thunk/auth-thunk";
import { notesThunk, statsThunk } from "src/store/thunk/notes-thunk";
//import { Route, Routes } from "react-router-dom";
import { logoutAction } from "src/store/actions/auth-action";
//import AuthRoute from "../Routes/AuthRoute";
import Auth from "../Auth";
import EditModal from "../EditModal";
import RowList from "../RowList";
import { isCreateAction, isVisibleAction } from "src/store/actions/interface-action";
import RowStatList from "../RowStatList";
//import NoteListRoute from "../Routes/NoteListRoute";

function App() {
  //const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [archiveState, setState] = useState<boolean>(false);
  const activeState = (state: boolean) => {
    setState(!state);
    if (state) {
      // navigate("notelist");
    } else {
      // navigate("archive");
    }
  };

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
    return (
      <div className="loadingMain">
        <div>
          <h1>Loading </h1>
          <img src="./img/loading.gif" alt="loading" />
        </div>
      </div>
    );
  }
  if (isAuth === "unknown") {
    return <div></div>;
  }

  return (
    <div className="App">
      {!isLoading && <Auth isAuth={isAuth === "loggedIn"} />}
      {isAuth === "loggedIn" ? (
        <>
          <RowList archiveState={archiveState} state={activeState} />
          <div className="createNoteRight">
            <button
              onClick={() => {
                dispatch({ type: isCreateAction });
                dispatch({ type: isVisibleAction, payload: { isVisible: true } });
              }}
              className="createNote"
            >
              Create
            </button>
          </div>
          <EditModal archiveState={archiveState} />
          <RowStatList />
        </>
      ) : (
        <div className="ad">
          <h1>This could be your ad</h1>
        </div>
      )}
    </div>
  );
}

export default App;
