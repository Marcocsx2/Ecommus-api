"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.createPaymentSchema = baseSchema_1.baseSchema({
    body: {
        order_id: hexStringSchema_1.hexStringSchema.required(),
        payment_data: joi_1.default
            .object({
            token: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            installments: joi_1.default.number().positive().integer().required(),
            payment_method_id: joi_1.default.string(),
            issuer_id: joi_1.default.string(),
            payer: joi_1.default
                .object({
                first_name: joi_1.default.string(),
                last_name: joi_1.default.string(),
                email: joi_1.default.string().required(),
            })
                .required(),
        })
            .required(),
    },
});
//# sourceMappingURL=paymentSchema.js.map