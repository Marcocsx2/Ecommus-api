import { model, Schema } from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";
import uniqueValidator from "mongoose-unique-validator";

let validState = {
  values: ["PENDING", "IN_PROGRESS", "CANCELLED", "DELIVERED"],
  message: "{VALUE} no es un estado valido",
};

const { Types } = Schema;

let orderSchema = new Schema(
  {
    order_date: {
      type: Types.Date,
      default: new Date(),
    },
    shipped_date: {
      type: Types.Date,
      required: true,
    },
    shipped_price: {
      type: Types.Number,
      required: false,
    },
    payment_amount: {
      type: Types.Number,
      required: true,
    },
    freight: {
      type: Types.String,
      required: true,
    },
    state: {
      type: Types.String,
      default: "PENDING",
      enum: validState,
    },
    address_id: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});

orderSchema.plugin(mongoosePagination);

const Order = model("Orders", orderSchema);

export default Order;
