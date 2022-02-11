import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const { Types } = Schema;

let ReportProductSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
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

ReportProductSchema.plugin(mongoosePaginateV2);

ReportProductSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});
const ReportProduct = model("ReportProduct", ReportProductSchema);

export default ReportProduct;
