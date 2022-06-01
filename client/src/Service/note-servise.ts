import { AxiosResponse } from "axios";
import $api from "src/http";
import { Note, RootState } from "src/store/types";

export default class NoteService {
  static async getNotes(): Promise<AxiosResponse<RootState>> {
    return $api.get<RootState>("/notes");
  }
  static async getStats(): Promise<AxiosResponse<RootState>> {
    return $api.get<RootState>("/notes/stats");
  }
  static async editNote(note: Note): Promise<AxiosResponse<RootState>> {
    return $api.patch<RootState>(`/notes/${note._id}`, { note });
  }
  static async createNotes(note: Note): Promise<AxiosResponse<RootState>> {
    return $api.post<RootState>("/notes/", { note });
  }
  static async archiveNote(note: Note): Promise<AxiosResponse<RootState>> {
    return $api.patch<RootState>(`/notes/${note._id}`, { note });
  }
  static async removeNote(id: string): Promise<AxiosResponse<RootState>> {
    return $api.delete<RootState>(`/notes/${id}`);
  }
}
