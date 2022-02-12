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
exports.signin = void 0;
const auth_1 = require("../../../services/auth");
const models_1 = require("../../models");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
exports.signin = catchAsync_1.default(dictionary_1.default('ERROR_CONTROLLER', 'Signin', process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'need email and password' });
    }
    const userDB = yield models_1.User.findOne({ email }).exec();
    if (!userDB) {
        return res.status(401).json({
            message: dictionary_1.default('EMAIL_INCORRECT', 'signin', language),
        });
    }
    if (!userDB.state) {
        return res.status(401).json({
            message: dictionary_1.default('CHECK_EMAIL', '', language),
        });
    }
    const match = yield userDB.schema.methods.checkPassword(userDB, password);
    if (!match) {
        return res.status(401).json({
            message: dictionary_1.default('PASSWORD_INCORRECT', 'signin', language),
        });
    }
    const token = auth_1.newToken(userDB);
    const refresh_token = auth_1.refreshToken(userDB);
    return res.status(200).json({
        message: dictionary_1.default('LOGIN_SUCCESS', userDB.fullname, language),
        data: userDB,
        token,
        refresh_token,
    });
}));
//# sourceMappingURL=signin.controller.js.map