import { Action, ThunkAction } from "@reduxjs/toolkit";
import NoteService from "src/api/note-api";
import {
  getNotesAction,
  getStatsAction,
  loadingAction,
  updateAction,
} from "../actions/note-action";
import { NoteState } from "../reducers/noteReducer";
import { Note } from "../types";

export const notesThunk = (): ThunkAction<void, NoteState, unknown, Action> => async (dispatch) => {
  try {
    dispatch({ type: loadingAction });
    const response = await NoteService.getNotes();
    dispatch({ type: getNotesAction, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const statsThunk = (): ThunkAction<void, NoteState, unknown, Action> => async (dispatch) => {
  try {
    dispatch({ type: loadingAction });
    const response = await NoteService.getStats();
    dispatch({ type: getStatsAction, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
export const editThunk =
  (note: Note): ThunkAction<void, NoteState, unknown, Action> =>
  async (dispatch) => {
    try {
      dispatch({ type: loadingAction });
      const response = await NoteService.editNote(note);
      dispatch({ type: updateAction, payload: response });
    } catch (e) {
      console.log(e);
    }
  };
export const createThunk =
  (note: Note): ThunkAction<void, NoteState, unknown, Action> =>
  async (dispatch) => {
    try {
      dispatch({ type: loadingAction });
      const response = await NoteService.createNotes(note);
      dispatch({ type: updateAction, payload: response });
    } catch (e) {
      console.log(e);
    }
  };
export const archiveThunk =
  (note: Note): ThunkAction<void, NoteState, unknown, Action> =>
  async (dispatch) => {
    try {
      dispatch({ type: loadingAction });
      const response = await NoteService.archiveNote(note);
      dispatch({ type: updateAction, payload: response });
    } catch (e) {
      console.log(e);
    }
  };
export const removeThunk =
  (id: string): ThunkAction<void, NoteState, unknown, Action> =>
  async (dispatch) => {
    try {
      dispatch({ type: loadingAction });
      const response = await NoteService.removeNote(id);
      dispatch({ type: updateAction, payload: response });
    } catch (e) {
      console.log(e);
    }
  };
