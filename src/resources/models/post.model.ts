import mongoose, { model, Schema } from "mongoose";
import { mongoosePagination } from "ts-mongoose-pagination";

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

let postSchema = new Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: [true, "author is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: { type: String, required: true },
    comments: [commentSchema],
    likes: [likeSchema],
    totalLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    totalComments: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.plugin(mongoosePagination);

const Post = model("Post", postSchema);
export default Post;
