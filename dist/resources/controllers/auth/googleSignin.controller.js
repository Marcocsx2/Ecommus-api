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
exports.googleSignin = void 0;
const auth_1 = require("../../../services/auth");
const models_1 = require("../../models");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID_WEB);
function verify(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: [
                process.env.CLIENT_ID_WEB,
                process.env.CLIENT_ID_ANDROID,
                process.env.CLIENT_ID_IOS,
            ],
        });
        const payload = ticket.getPayload();
        return {
            name: payload.name,
            email: payload.email,
            image: payload.picture,
            state: true,
            google: true,
        };
    });
}
exports.googleSignin = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "GOOGLE_SIGNIN", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { idToken } = req.body;
    console.log(idToken);
    let googleUser = yield verify(idToken).catch((err) => {
        return res.status(403).json({
            message: "Error al verificar el id_token",
        });
    });
    const userExistDB = yield models_1.User.findOne({ email: googleUser.email });
    if (userExistDB) {
        if (!userExistDB.google) {
            return res.status(400).json({
                message: dictionary_1.default("EMAIL_WITH_SIMPLE_AUTH", userExistDB.email, language),
            });
        }
        else {
            let token = auth_1.newToken(userExistDB);
            let refreshTkn = auth_1.refreshToken(userExistDB);
            return res.json({
                message: dictionary_1.default("LOGIN_SUCCESS", userExistDB.fullname, language),
                user: userExistDB,
                token,
                refresh_token: refreshTkn,
            });
        }
    }
    else {
        let user = {
            fullname: googleUser.name,
            email: googleUser.email,
            photo: googleUser.image,
            google: googleUser.google,
            state: googleUser.state,
            password: "google_accout",
        };
        const newUserGoogle = yield models_1.User.create(user);
        let token = auth_1.newToken(newUserGoogle);
        let refreshTkn = auth_1.refreshToken(newUserGoogle);
        return res.json({
            message: dictionary_1.default("LOGIN_SUCCESS", newUserGoogle.fullname, language),
            user: newUserGoogle,
            token,
            refresh_token: refreshTkn,
        });
    }
}));
//# sourceMappingURL=googleSignin.controller.js.map