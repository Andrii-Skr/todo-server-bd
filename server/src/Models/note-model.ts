import mongoose from "mongoose";
import { Schema } from "mongoose";

const bdNote = new Schema({
  name: { type: String },
  category: { type: String, default: "Task" },
  content: { type: String, default: "" },
  archive: { type: Boolean, default: true },
  dates: { type: Array },
  created: { type: String },
  userId: { type: String, required: true },
});

export default mongoose.model("NoteModel", bdNote);
