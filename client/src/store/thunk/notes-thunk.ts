import { ThunkAction } from "@reduxjs/toolkit";
import NoteService from "src/Service/note-servise";
import { noteAction } from "../actions/note-action";
import { NoteState } from "../reducers/noteReducer";
import { Note } from "../types";

export const notesThunk = (): ThunkAction<void, NoteState, unknown, any> => async (dispatch) => {
  try {
    dispatch({ type: noteAction.loading });
    const response = await NoteService.getNotes();
    dispatch({ type: noteAction.getNotes, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const statsThunk = (): ThunkAction<void, NoteState, unknown, any> => async (dispatch) => {
  try {
    dispatch({ type: noteAction.loading });
    const response = await NoteService.getStats();
    dispatch({ type: noteAction.getStats, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
export const editThunk =
  (note: Note): ThunkAction<void, NoteState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: noteAction.loading });
      const response = await NoteService.editNote(note);
      dispatch({ type: noteAction.update, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
export const createThunk =
  (note: Note): ThunkAction<void, NoteState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: noteAction.loading });
      const response = await NoteService.createNotes(note);
      dispatch({ type: noteAction.update, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
export const archiveThunk =
  (note: Note): ThunkAction<void, NoteState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: noteAction.loading });
      const response = await NoteService.archiveNote(note);
      dispatch({ type: noteAction.update, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
export const removeThunk =
  (id: string): ThunkAction<void, NoteState, unknown, any> =>
  async (dispatch) => {
    try {
      dispatch({ type: noteAction.loading });
      const response = await NoteService.removeNote(id);
      dispatch({ type: noteAction.update, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };
