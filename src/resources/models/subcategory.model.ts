import mongoose, { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const subcategorySchema = new Schema(
  {
    name: {
      lowercase: true,
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

subcategorySchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
