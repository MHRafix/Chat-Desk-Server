import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChat extends Document {
  _id?: Types.ObjectId;
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId[];
  last_message: string;
  groupAdmin: Types.ObjectId;
}

const chatModel: Schema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    last_message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    group_pic: { type: String },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", chatModel);
