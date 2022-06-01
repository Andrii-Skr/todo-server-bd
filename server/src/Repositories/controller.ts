import { Request, Response } from "express";
import OperationWithNotes from "../Services/notes-service";
import { noteSchemaEdit } from "./noteSchema";
import { ValidationError } from "yup";
import { TempNote } from "../Store/types";
import DbNote from "../Models/note-model";

class Controller {
  async postNotes(req: any, res: Response) {
    console.log(req.body.note);
    OperationWithNotes.createNote(req.body.note, req.user.id);
    // reWrite this part
    return res.json({ message: "Note was create successfully" });
  }

  async deleteNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userId = req.user.id;
      const checkId = await DbNote.findById(id);
      console.log(checkId);
      if (!checkId) {
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }
      if (userId !== checkId.userId) {
        return res.status(401).json({ message: "Auth err" });
      }
      OperationWithNotes.removeNote(checkId);
      return res.json({ message: "Note was deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something goes wrong whith delete id :(" });
    }
  }

  async patchNotes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      const checkId = await DbNote.findById(id);
      if (!checkId) {
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }
      if (userId !== checkId.userId) {
        return res.status(401).json({ message: "Auth err" });
      }
      const filds = Object.keys(noteSchemaEdit.fields);
      const noteReq = {};
      for (const key of filds) {
        if (typeof req.body.note[key] !== "undefined") noteReq[key] = req.body.note[key];
      }
      const note: TempNote = (await noteSchemaEdit.validate(noteReq)) as TempNote;
      OperationWithNotes.patchNote(checkId, note);
      return res.json({ message: "Note was edited successfully" });
    } catch (error) {
      let code = 500;
      if (error instanceof ValidationError) {
        code = 400;
      }
      console.error(error);
      return res.status(code).json({ message: "Something goes wrong whith edit note :(" });
    }
  }

  async getNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // @ts-ignore
      const userId = req.user.id;
      const checkId = await DbNote.findById(id);
      if (!checkId) {
        return res.status(404).json({ message: "Can't find ID, check plz" });
      }
      if (userId !== checkId.userId) {
        return res.status(401).json({ message: "Auth err" });
      }
      return res.json({ note: checkId });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something goes wrong whith find note :(" });
    }
  }

  async getNotes(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      console.log(userId);
      return res.json({ note: await OperationWithNotes.getNotes(userId) });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: "Something goes wrong whith find note :(" });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      // @ts-ignore
      const userId = req.user.id;
      return res.json({ stats: await OperationWithNotes.getStats(userId) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something goes wrong whith find stats :(" });
    }
  }
}

export default new Controller();
