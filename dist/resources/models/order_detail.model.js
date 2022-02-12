"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { Types } = mongoose_1.Schema;
let orderDetailSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
orderDetailSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const OrderDetail = mongoose_1.model("OrderDetail", orderDetailSchema);
exports.default = OrderDetail;
//# sourceMappingURL=order_detail.model.js.map