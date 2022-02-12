"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const baseSchema = ({ body, files }) => {
    return {
        params: {},
        files: Object.assign({}, files),
        body: Object.assign(Object.assign({}, body), { fname: joi_1.default.string().required(), service: joi_1.default.string(), language: joi_1.default.string().allow('es', 'en') }),
    };
};
exports.baseSchema = baseSchema;
//# sourceMappingURL=baseSchema.js.map