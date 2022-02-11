import { model, Schema } from "mongoose";

const { Types } = Schema;

const MessageSchema = new Schema(
  {
    room_id: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    of: {
      type: Types.ObjectId,
      ref: "User",
      unique: false,
    },
    to: {
      type: Types.ObjectId,
      ref: "User",
      unique: false,
    },
    message: {
      type: Types.String,
      unique: false,
    },
  },
  { timestamps: true }
);

const Message = model("Message", MessageSchema);

export default Message;
