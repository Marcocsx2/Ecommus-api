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
exports.updatePostController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const deleteFile_1 = require("../../../utils/deleteFile");
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const uploadFile_1 = require("../../../utils/uploadFile");
const models_1 = require("../../models");
exports.updatePostController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "UpdatePostController", process.env.NODE_ENV), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post_id } = req.body;
    const existPost = yield models_1.Post.findById(post_id);
    if (!existPost) {
        return res.status(404).json({
            message: dictionary_1.default("NO_RESOURCES", "", language),
        });
    }
    const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    if (file) {
        const responseS3 = yield uploadFile_1.uploadOneFile(file, "posts", _id);
        if (!responseS3.Location) {
            return res.status(500).json({
                message: "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
            });
        }
        const isDelete = yield deleteFile_1.deleteFileToPost(existPost.image);
        if (!isDelete) {
            return res.status(500).json({
                message: "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
            });
        }
        const updatedPost = yield models_1.Post.findByIdAndUpdate(post_id, Object.assign({ image: responseS3.Location }, req.body), { new: true });
        return res.status(200).json({
            message: dictionary_1.default("UPDATE", updatedPost.title, language),
            post: updatedPost,
        });
    }
    const updatedPost = yield models_1.Post.findByIdAndUpdate(post_id, Object.assign({}, req.body), { new: true }).populate([
        { path: "author", select: "fullname photo" },
        { path: "comments.user", select: "fullname photo" },
    ]);
    return res.status(200).json({
        message: dictionary_1.default("UPDATE", updatedPost.title, language),
        post: updatedPost,
    });
}));
//# sourceMappingURL=updatePost.controller.js.map