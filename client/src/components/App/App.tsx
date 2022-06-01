import React, { useEffect, useState } from "react";
import RowStatList from "../RowStatList/RowStatList";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "../EditModal";
import { selectIsAuth, selectIsLoading, selectUpdate } from "../../store/store";
import { AppDispatch } from "../../store/types";
import RowList from "../RowList/RowList";
import "./App.css";
import Auth from "../Auth/Auth";
import { checkAuthThunk } from "src/store/thunk/auth-thunk";
import { notesThunk, statsThunk } from "src/store/thunk/notes-thunk";
import { interfaceAction } from "src/store/actions/interface-action";
import { authAction } from "src/store/actions/auth-action";

function App() {
  const isAuth = useSelector(selectIsAuth);
  const isLoading = useSelector(selectIsLoading);
  const update = useSelector(selectUpdate);

  const [archiveState, setState] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuthThunk());
    } else {
      dispatch({ type: authAction.checkLoading });
    }
  }, []);
  useEffect(() => {
    if (isAuth) {
      dispatch(notesThunk());
      dispatch(statsThunk());
    }
  }, [isAuth, update]);
  const activeState = (state: boolean) => {
    setState(!state);
  };
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

  return (
    <div className="App">
      <Auth isAuth={isAuth} />
      {isAuth ? (
        <>
          <RowList archiveState={archiveState} state={activeState} />
          <div className="createNoteRight">
            <button
              onClick={() => {
                dispatch({ type: interfaceAction.isCreate });
                dispatch({ type: interfaceAction.isVisible, isVisible: true });
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
