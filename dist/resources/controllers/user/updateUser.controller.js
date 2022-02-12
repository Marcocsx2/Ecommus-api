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
exports.updateUserController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const uploadFile_1 = require("../../../utils/uploadFile");
const models_1 = require("../../models");
exports.updateUserController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "updateUserController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { user_id } = req.body;
    const existUser = yield models_1.User.findById(user_id);
    if (!existUser) {
        return res.status(404).json({
            message: dictionary_1.default("ERROR_USER_NOT_FOUND", "", language),
        });
    }
    if (user_id.toString() != _id.toString()) {
        return res.status(403).json({
            message: dictionary_1.default("UNAUTHORIZED", "", language),
        });
    }
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.photo;
    if (file) {
        const responseS3 = yield uploadFile_1.uploadOneFile(file, "profile", user_id);
        if (!responseS3.Location) {
            return res.status(500).json({
                message: "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
            });
        }
        const userUpdated = yield models_1.User.findByIdAndUpdate(user_id, Object.assign({ photo: responseS3.Location }, req.body), { new: true });
        return res.status(200).json({
            message: dictionary_1.default("UPDATE", userUpdated.fullname, language),
            user: userUpdated,
        });
    }
    const userUpdated = yield models_1.User.findByIdAndUpdate(user_id, Object.assign({}, req.body), { new: true });
    return res.status(200).json({
        message: dictionary_1.default("UPDATE", userUpdated.fullname, language),
        user: userUpdated,
    });
}));
//# sourceMappingURL=updateUser.controller.js.map