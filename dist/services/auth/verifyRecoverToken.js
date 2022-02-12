"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRecoverToken = void 0;
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dictionary_1 = __importDefault(require("../../utils/dictionary"));
exports.verifyRecoverToken = (token) => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, config_1.default.secrets_recover.jwt, (err, payload) => {
        if (err)
            return resolve({
                err: true,
                message: dictionary_1.default('TOKEN_EXPIRED', 'token', process.env.LAN),
            });
        resolve(payload);
    });
});
//# sourceMappingURL=verifyRecoverToken.js.map