"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderSchema = exports.getOrderDetailByOrderSchema = exports.createOrderSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.createOrderSchema = baseSchema_1.baseSchema({
    body: {
        order: joi_1.default
            .object({
            shipped_date: joi_1.default.date().required(),
            shipped_price: joi_1.default.number().required(),
            freight: joi_1.default.string().required(),
            address_id: hexStringSchema_1.hexStringSchema.required(),
            payment_amount: joi_1.default.number().required(),
        })
            .required(),
        order_detail: joi_1.default
            .array()
            .items(joi_1.default.object({
            unit_price: joi_1.default.number().positive().required(),
            quantity: joi_1.default.number().positive().integer().required(),
            discount: joi_1.default.number().integer().required(),
            product_id: hexStringSchema_1.hexStringSchema.required(),
        }))
            .required(),
    },
});
exports.getOrderDetailByOrderSchema = baseSchema_1.baseSchema({
    body: {
        order_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.getAllOrderSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
    },
});
//# sourceMappingURL=orderSchema.js.map