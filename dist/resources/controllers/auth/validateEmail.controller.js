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
exports.validateEmail = void 0;
const auth_1 = require("../../../services/auth");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models/");
exports.validateEmail = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "ValidateEmail_Controller", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { code } = req.body;
    const secretCodeDB = yield models_1.SecretCode.findOne({ code });
    if (!secretCodeDB) {
        return res.status(400).json({
            message: dictionary_1.default("ERROR_CODE_VALIDATION", "", language),
        });
    }
    if (secretCodeDB.code !== code) {
        return res.status(400).json({
            message: "Codigos no coinciden",
        });
    }
    const userStateUpdated = yield models_1.User.findByIdAndUpdate(secretCodeDB.user_id, { state: true }, { new: true });
    const token = auth_1.newToken(userStateUpdated);
    const refreshTkn = auth_1.refreshToken(userStateUpdated);
    return res.status(200).json({
        message: dictionary_1.default("SUCCESS_CODE_VALIDATION", "", language),
        data: userStateUpdated,
        token,
        refresh_token: refreshTkn,
    });
}));
//# sourceMappingURL=validateEmail.controller.js.map