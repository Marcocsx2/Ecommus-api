"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.getUserByIdSchema = exports.getUsersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const baseSchema_1 = require("./baseSchema");
const hexStringSchema_1 = require("./hexStringSchema");
exports.getUsersSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
    },
});
exports.getUserByIdSchema = baseSchema_1.baseSchema({
    body: {
        user_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.updateUserSchema = baseSchema_1.baseSchema({
    body: {
        user_id: hexStringSchema_1.hexStringSchema.required(),
        fullname: joi_1.default.string().trim(),
    },
});
//# sourceMappingURL=userSchema.js.map