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
exports.recoverPassword = void 0;
const recoverPasswordToken_1 = require("../../../services/auth/recoverPasswordToken");
const sendMessageEmail_1 = require("../../../services/auth/sendMessageEmail");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
const recoverPassword_html_1 = require("../templates/recoverPassword.html");
exports.recoverPassword = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "recoverPassword", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { email } = req.body;
    const userDB = yield models_1.User.findOne({ email: email });
    if (!userDB) {
        return res.status(404).json({
            message: dictionary_1.default("EMAIL_NOT_MATCHECKED", "email", language),
        });
    }
    if (userDB.google) {
        return res.status(404).json({
            message: dictionary_1.default("EMAIL_SIGNED_GOOGLE", "email-google", language),
        });
    }
    const token = recoverPasswordToken_1.recoverPasswordToken(userDB);
    const recoverPasswordLink = `${process.env.CLIENT_HOST}/auth/recover-password/${token}`;
    console.log("Html ", recoverPassword_html_1.html);
    var html_string = recoverPassword_html_1.html.toString();
    console.log("Recover Password Html", html_string);
    var obj = {
        recoverPasswordLink: recoverPasswordLink,
        textPassword: recoverPasswordLink,
        linkOriginal: recoverPasswordLink,
    };
    const algo = Object.keys(obj);
    for (var i = 0; i < algo.length; i++) {
        html_string = html_string.replace("{" + algo[i] + "}", obj[algo[i]]);
    }
    sendMessageEmail_1.sendEmail(userDB.email, "Recover Password", "Recover Password", `${html_string}`);
    return res.status(200).json({
        message: dictionary_1.default("EMAIL_TO_CHANGE_PASSWORD_SUCCESS", "send email", language),
    });
}));
//# sourceMappingURL=recoverPassword.controller.js.map