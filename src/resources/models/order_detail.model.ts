import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// let validShipVia = {
//   values: [0],
//   message: "{VALUE} no es un rol valido",
// };

const { Types } = Schema;

let orderDetailSchema = new Schema(
  {
    unit_price: {
      type: Types.Number,
      required: true,
    },
    quantity: {
      type: Types.Number,
      required: true,
    },
    discount: {
      type: Types.Number,
      default: 0.0,
    },
    product_id: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    order_id: {
      type: Types.ObjectId,
      ref: "Orders",
      required: true,
    },
  },
  { timestamps: true }
);

orderDetailSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const OrderDetail = model("OrderDetail", orderDetailSchema);

export default OrderDetail;
