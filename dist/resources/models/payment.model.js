"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { Types } = mongoose_1.Schema;
let PaymentSchema = new mongoose_1.Schema({
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
PaymentSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const Payment = mongoose_1.model("Payment", PaymentSchema);
exports.default = Payment;
//# sourceMappingURL=payment.model.js.map