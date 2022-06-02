import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { NoteRes } from "src/api/note-api";
import { noteAction } from "../actions/note-action";
import { Note, Stat } from "../types";

export type NoteState = { notes: Note[]; notesStats: Stat[]; updateNotes: boolean };
const defaultState: NoteState = {
  notes: [],
  notesStats: [],
  updateNotes: false,
};
export const noteReducer = createReducer<NoteState>(defaultState, (builder) => {
  builder.addCase(noteAction.getNotes, (state, action: PayloadAction<NoteRes>) => {
    state.notes = [...action.payload.note];
  });
  builder.addCase(noteAction.getStats, (state, action: PayloadAction<NoteRes>) => {
    state.notesStats = [...action.payload.stats];
  });
  builder.addCase(noteAction.update, (state, action) => {
    state.updateNotes = !state.updateNotes;
  });
});
