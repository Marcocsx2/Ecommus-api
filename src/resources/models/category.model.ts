import mongoose, { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

categorySchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
