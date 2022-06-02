import { AxiosResponse } from "axios";
import $api from "src/http";
import { Note, Stat } from "src/store/types";

export type NoteRes = {
  note: Note[];
  stats: Stat[];
};

export default class NoteService {
  static async getNotes(): Promise<AxiosResponse<NoteRes>> {
    return $api.get<NoteRes>("/notes");
  }
  static async getStats(): Promise<AxiosResponse<NoteRes>> {
    return $api.get<NoteRes>("/notes/stats");
  }
  static async editNote(note: Note): Promise<void> {
    return $api.patch(`/notes/${note._id}`, { note });
  }
  static async createNotes(note: Note): Promise<void> {
    return $api.post("/notes/", { note });
  }
  static async archiveNote(note: Note): Promise<void> {
    return $api.patch(`/notes/${note._id}`, { note });
  }
  static async removeNote(id: string): Promise<void> {
    return $api.delete(`/notes/${id}`);
  }
}
