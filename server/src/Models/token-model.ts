import mongoose from "mongoose";
import { Schema } from "mongoose";

const token = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "UserModel" },
  refreshToken: { type: String, required: true },
});

export default mongoose.model("tokenModel", token);
