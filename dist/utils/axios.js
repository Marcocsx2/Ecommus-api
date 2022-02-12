"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosGlovoClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.axiosGlovoClient = axios_1.default.create({
    baseURL: `${process.env.GLOVO_URL}`,
    headers: {
        Authorization: `Basic ${process.env.GLOVO_TOKEN}`
    }
});
//# sourceMappingURL=axios.js.map