"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdSchema = exports.hexStringSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const hexStringSchema = joi_1.default.string().length(24).hex();
exports.hexStringSchema = hexStringSchema;
const findByIdSchema = {
    id: hexStringSchema.required()
};
exports.findByIdSchema = findByIdSchema;
//# sourceMappingURL=hexStringSchema.js.map