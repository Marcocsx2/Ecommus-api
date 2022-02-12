"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const signupSchema = baseSchema_1.baseSchema({
    body: {
        name: joi_1.default.string().trim(),
        image: joi_1.default.string().trim(),
        role: joi_1.default.string().trim(),
        email: joi_1.default.string().email(),
        password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        state: joi_1.default.string().trim(),
        google: joi_1.default.boolean(),
    },
});
exports.signupSchema = signupSchema;
//# sourceMappingURL=authSchema.js.map