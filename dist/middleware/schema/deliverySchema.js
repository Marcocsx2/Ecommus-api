"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateDeliverySchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.estimateDeliverySchema = baseSchema_1.baseSchema({
    body: {
        data: joi_1.default
            .array()
            .items(joi_1.default
            .object({
            product_id: hexStringSchema_1.hexStringSchema.required(),
            address_id: hexStringSchema_1.hexStringSchema.required(),
        })
            .required())
            .required(),
    },
});
//# sourceMappingURL=deliverySchema.js.map