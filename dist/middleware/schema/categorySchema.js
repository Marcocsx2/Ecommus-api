"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategoryByCategorySchema = exports.createSubcategorySchema = exports.createCategorySchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.createCategorySchema = baseSchema_1.baseSchema({
    body: {
        name: joi_1.default.string().required(),
    },
});
exports.createSubcategorySchema = baseSchema_1.baseSchema({
    body: {
        category: hexStringSchema_1.hexStringSchema.required(),
        name: joi_1.default.string().required(),
    },
});
exports.getSubcategoryByCategorySchema = baseSchema_1.baseSchema({
    body: {
        category: hexStringSchema_1.hexStringSchema.required()
    },
});
//# sourceMappingURL=categorySchema.js.map