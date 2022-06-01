import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  ActivatedLink: { type: String },
});

export default mongoose.model("UserModel", user);
