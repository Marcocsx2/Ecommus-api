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
exports.deletePostController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const deleteFile_1 = require("../../../utils/deleteFile");
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.deletePostController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "DeletePostController", process.env.NODE_ENV), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { post_id } = req.body;
    const existPost = yield models_1.Post.findById(post_id);
    if (!existPost) {
        return res.status(404).json({
            message: dictionary_1.default("NO_RESOURCES", "", language),
        });
    }
    const isDelete = yield deleteFile_1.deleteFileToPost(existPost.image);
    if (!isDelete) {
        return res.status(500).json({
            message: "No se pudo realizar la eliminación de la imagen",
        });
    }
    const deletedPost = yield models_1.Post.findByIdAndRemove(post_id, { new: true });
    return res.status(200).json({
        message: dictionary_1.default("DELETE", deletedPost.title, language),
        post: deletedPost,
    });
}));
//# sourceMappingURL=deletePost.controller.js.map