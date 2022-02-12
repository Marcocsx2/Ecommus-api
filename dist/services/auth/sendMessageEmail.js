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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const console_1 = __importDefault(require("console"));
const CLIENT_ID = "592107006941-o6b93povtk4rbne9ohie88pgek9fer70.apps.googleusercontent.com";
const CLIENT_SECRET = "etrzhuqxJadUD96GL22Z2aXi";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04NDnCLQN_pwBCgYIARAAGAQSNwF-L9IrmXZiPqhOdWDi394jHeHcHieIxWuUM4Qc4UjIJHHHNmzC8D5ENV_wvZ0cx-S2LSE7Suw";
exports.sendEmail = (email, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "roberto.huels85@ethereal.email",
            pass: "N95dg9yrhhTGSpGwfE"
        },
    });
    const emailOptions = {
        from: `${process.env.ALUKA_EMAIl}`,
        to: email,
        subject,
        text,
        html: `${html}`,
    };
    transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            console_1.default.log("NODE_EMAILER ERROR: ", err);
            return;
        }
        console_1.default.log("info", info);
        return info;
    });
});
//# sourceMappingURL=sendMessageEmail.js.map