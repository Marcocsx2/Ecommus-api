import mongoose, { model } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";

let Schema = mongoose.Schema;

const shoppingCartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    isEnabled: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: {
      type: Schema.Types.Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

shoppingCartSchema.plugin(mongoosePagination);

const ShoppingCart = model("ShoppingCart", shoppingCartSchema);
export default ShoppingCart;
