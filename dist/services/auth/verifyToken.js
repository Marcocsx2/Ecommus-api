"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyToken = (token) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, config_1.default.secrets.jwt, (err, payload) => {
        if (err)
            return reject(err);
        resolve(payload);
    });
});
//# sourceMappingURL=verifyToken.js.map