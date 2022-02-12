"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
let validState = {
    values: ["PENDING", "IN_PROGRESS", "CANCELLED", "DELIVERED"],
    message: "{VALUE} no es un estado valido",
};
const { Types } = mongoose_1.Schema;
let orderSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
orderSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
orderSchema.plugin(mongoose_paginate_v2_1.default);
const Order = mongoose_1.model("Orders", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map