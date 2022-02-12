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
exports.changePassword = void 0;
const verifyRecoverToken_1 = require("../../../services/auth/verifyRecoverToken");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../models");
exports.changePassword = catchAsync_1.default(dictionary_1.default('ERROR_CONTROLLER', 'changePasswordRecover', process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const token = req.headers.token;
    const { newPassword } = req.body;
    if (!token) {
        return res
            .status(404)
            .json({ message: dictionary_1.default('FIELDS_NEEDED', 'token', language) });
    }
    if (!newPassword) {
        return res
            .status(404)
            .json({ message: dictionary_1.default('FIELDS_NEEDED', 'newPassword', language) });
    }
    const userPayload = yield verifyRecoverToken_1.verifyRecoverToken(token);
    if (userPayload.err) {
        return res.status(404).json({ message: userPayload.message });
    }
    let newPasswordHash = bcrypt_1.default.hashSync(newPassword, 10);
    const userUpdated = yield models_1.User.findByIdAndUpdate({ _id: userPayload.id }, { password: newPasswordHash }, { new: true });
    return res.status(200).json({
        message: dictionary_1.default('UPDATE', `${userUpdated.fullname}`, language),
        data: userUpdated,
    });
}));
//# sourceMappingURL=changePassword.controller.js.map