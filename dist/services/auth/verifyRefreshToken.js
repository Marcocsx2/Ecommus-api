"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = void 0;
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.verifyRefreshToken = (refreshToken) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(refreshToken, config_1.default.secrets_refresh.jwt, (err, payload) => {
        if (err)
            return reject(err);
        resolve(payload);
    });
});
//# sourceMappingURL=verifyRefreshToken.js.map