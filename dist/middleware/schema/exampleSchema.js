"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.exampleSchema = baseSchema_1.baseSchema({
    body: {
        id: hexStringSchema_1.hexStringSchema.required(),
        exampleName: joi_1.default.number().integer().positive(),
        exampleSuername: joi_1.default.number().integer().positive(),
    },
});
//# sourceMappingURL=exampleSchema.js.map