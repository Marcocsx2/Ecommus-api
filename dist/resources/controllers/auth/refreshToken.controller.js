"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const auth_1 = require("../../../services/auth");
const verifyRefreshToken_1 = require("../../../services/auth/verifyRefreshToken");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.refreshTokenController = catchAsync_1.default(dictionary_1.default('ERROR_CONTROLLER', 'RefreshToken', process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const refreshTkn = req.headers.refreshtoken;
    if (!refreshTkn) {
        return res.status(404).json({
            message: dictionary_1.default('FIELDS_NEEDED', 'refreshToken', language),
        });
    }
    const payload = yield verifyRefreshToken_1.verifyRefreshToken(refreshTkn);
    const userDB = yield models_1.User.findById(payload.id);
    const token = auth_1.newToken(userDB);
    const refToken = auth_1.refreshToken(userDB);
    return res.status(200).json({
        data: userDB,
        token: token,
        refresh_token: refToken,
    });
}));
//# sourceMappingURL=refreshToken.controller.js.map