import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { Types } = Schema;

const MessageSchema = new Schema(
  {
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


let ChatSchema = new Schema(
  {
    first_user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    second_user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    messages: [MessageSchema]
  },
  { timestamps: true }
);

ChatSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const Chat = model("Chat", ChatSchema);

export default Chat;
