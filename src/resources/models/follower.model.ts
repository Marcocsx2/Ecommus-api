import mongoose, { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import moment from "moment-timezone";

const { Types } = Schema;

let followerSchema = new Schema(
  {
    user_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    follower_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    has_friend: {
      type: Types.Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

followerSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});
const Follower = model("Follower", followerSchema);

export default Follower;
