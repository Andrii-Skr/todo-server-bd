import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { RootState } from "./types";
//import { devToolsEnhancer } from "@redux-devtools/extension";

import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./reducers/rootReducer";

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectIsStats = (state: RootState) => state.notes.notesStats;
export const selectIsAuth = (state: RootState) => state.user.userAuth;
export const selectEmail = (state: RootState) => state.user.userDto?.email;
export const selectIsLoading = (state: RootState) => state.user.isloading;
export const selectUpdate = (state: RootState) => state.notes.updateNotes;
export const selectIsEdit = (state: RootState) => state.interface.isEdit;
export const selectCurrentNote = (state: RootState) => state.interface.currentNote;
export const selectIsVisible = (state: RootState) => state.interface.isVisible;

//export const store = createStore(reducer, devToolsEnhancer());
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
