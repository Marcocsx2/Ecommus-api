"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShoppingCartSchema = exports.changeShoppingCartStateSchema = exports.deleteProductToCartSchema = exports.addProductToCartSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.addProductToCartSchema = baseSchema_1.baseSchema({
    body: {
        product: hexStringSchema_1.hexStringSchema.required(),
        isEnabled: joi_1.default.boolean(),
        quantity: joi_1.default.number().integer().required(),
    },
});
exports.deleteProductToCartSchema = baseSchema_1.baseSchema({
    body: {
        items: joi_1.default.array().items(hexStringSchema_1.hexStringSchema.required()).required(),
    },
});
exports.changeShoppingCartStateSchema = baseSchema_1.baseSchema({
    body: {
        item_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.updateShoppingCartSchema = baseSchema_1.baseSchema({
    body: {
        item_id: hexStringSchema_1.hexStringSchema.required(),
        quantity: joi_1.default.number().integer(),
    },
});
//# sourceMappingURL=shoppingCartSchema.js.map