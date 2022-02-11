import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoosePaginateV2 from 'mongoose-paginate-v2';

const { Types } = Schema;

let ReportPostSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    post: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
      unique: false,
    },
    description: {
      type: String,
      requiered: true,
    },
    status: {
      type: Boolean,
      requiered: true,
      default: false,
    },
  },
  { timestamps: true }
);

ReportPostSchema.plugin(mongoosePaginateV2);

ReportPostSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});
const ReportPost = model("ReportPost", ReportPostSchema);

export default ReportPost;
