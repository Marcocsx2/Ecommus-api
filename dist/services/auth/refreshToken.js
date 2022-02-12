"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
exports.refreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.secrets_refresh.jwt, {
        expiresIn: config_1.default.secrets_refresh.jwtExp,
    });
};
//# sourceMappingURL=refreshToken.js.map