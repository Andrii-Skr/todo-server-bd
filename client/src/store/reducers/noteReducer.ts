import { createReducer } from "@reduxjs/toolkit";
import { getNotesAction, getStatsAction, updateAction } from "../actions/note-action";
import { Note, Stat } from "../types";

export type NoteState = { notes: Note[]; notesStats: Stat[]; updateNotes: boolean };
const defaultState: NoteState = {
  notes: [],
  notesStats: [],
  updateNotes: false,
};
export const noteReducer = createReducer<NoteState>(defaultState, (builder) => {
  builder
    .addCase(getNotesAction, (state, action) => {
      state.notes = [...action.payload.note];
    })
    .addCase(getStatsAction, (state, action) => {
      state.notesStats = [...action.payload.stats];
    })
    .addCase(updateAction, (state, action) => {
      state.updateNotes = !state.updateNotes;
    });
});
