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
exports.signup = void 0;
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendConfirmationEmail_1 = require("../../../services/auth/sendConfirmationEmail");
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
const moment_1 = __importDefault(require("moment"));
exports.signup = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "signup", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = crypto_random_string_1.default({ length: 6, type: "numeric" });
    const language = req.body.language || process.env.LAN;
    const { fullname, email, password } = req.body;
    let passwordHashed = bcrypt_1.default.hashSync(password, 10);
    const dataUser = {
        fullname,
        email,
        password: passwordHashed,
    };
    const emailWithStateTrueExist = yield models_1.User.findOne({
        email,
        state: true,
    });
    if (emailWithStateTrueExist) {
        return res.status(400).json({
            message: dictionary_1.default("EMAIL_EXIST", emailWithStateTrueExist.email, language),
        });
    }
    const emailWithStateFalseExist = yield models_1.User.findOne({
        email,
        state: false,
    });
    if (emailWithStateFalseExist) {
        const userUpdated = yield models_1.User.findByIdAndUpdate(emailWithStateFalseExist._id, dataUser);
        yield sendConfirmationEmail_1.sendConfirmationEmail(userUpdated.email, userUpdated.fullname, code);
        const updateCode = yield models_1.SecretCode.findOneAndUpdate({ user_id: userUpdated._id }, { code, dateCreated: moment_1.default(Date.now()).tz("America/Lima").format() });
        if (!updateCode) {
            yield models_1.SecretCode.create({ user_id: userUpdated._id, code });
        }
        return res.json({
            message: dictionary_1.default("CREATE", userUpdated.fullname, language),
            validation: "Por favor confirme la dirección de su correo electrónico",
        });
    }
    const newUserDB = yield models_1.User.create(dataUser);
    yield sendConfirmationEmail_1.sendConfirmationEmail(newUserDB.email, newUserDB.fullname, code);
    yield models_1.SecretCode.create({
        user_id: newUserDB._id,
        code,
    });
    return res.json({
        message: dictionary_1.default("CREATE", newUserDB.fullname, language),
        validation: "Por favor confirme la dirección de su correo electrónico",
    });
}));
//# sourceMappingURL=signup.controller.js.map