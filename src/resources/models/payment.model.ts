import { model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { Types } = Schema;

let PaymentSchema = new Schema({
  order_id: {
    type: Types.ObjectId,
    ref: "Order",
    required: true,
  },
  date_created: {
    type: Types.Date,
    required: true,
  },
  date_approved: {
    type: Types.Date,
    required: false,
  },
  payment_method_id: {
    type: Types.String,
    required: true,
  },
  payment_type_id: {
    type: Types.String,
    required: true,
  },
  status: {
    type: Types.String,
    required: true,
  },
  status_detail: {
    type: Types.String,
    required: true,
  },
  transaction_amount: {
    type: Types.String,
    required: false,
  },
  payment_id: {
    type: Types.Number,
    required: true,
  },
});

PaymentSchema.plugin(uniqueValidator, {
  message: "{PATH} debe de ser unico",
});

const Payment = model("Payment", PaymentSchema);

export default Payment;
