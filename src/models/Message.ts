import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  _id?: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  chat: any;
}

const messageModel: Schema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageModel);
