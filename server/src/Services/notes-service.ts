import { Note, TempNote } from "../Store/types";
import { parseDate } from "../Helpers/parseDate";
import { getStat } from "../Helpers/getStat";
import DbNote from "../Models/note-model";
import { noteSchemaCreate } from "../Repositories/noteSchema";

class OperationWithNotes {
  async removeNote(id: Note) {
    await DbNote.findByIdAndDelete(id);
  }

  async getNotes(id: string) {
    return await DbNote.find({ userId: id });
  }

  async createNote(noteBody: TempNote, id: string) {
    try {
      const filds = Object.keys(noteSchemaCreate.fields);
      const noteReq = {};
      for (const key of filds) {
        noteReq[key] = noteBody[key];
      }
      const note: TempNote = (await noteSchemaCreate.validate(noteReq)) as TempNote;

      const NoteNew = new DbNote({
        ...note,
        userId: id,
        dates: parseDate(note.content),
        created: new Date().toLocaleDateString(),
      });
      await NoteNew.save();
      console.log(NoteNew);
      //throw new Error(``)
    } catch (error) {
      console.log(error);
    }
  }

  async getStats(id: string) {
    return getStat(await DbNote.find({ userId: id }));
  }

  async patchNote(id: Note, note: TempNote) {
    await DbNote.findByIdAndUpdate(id, {
      ...note,
      dates: note.content ? parseDate(note.content) : id.dates,
      created: new Date().toLocaleDateString(),
    });
  }
}

export default new OperationWithNotes();
