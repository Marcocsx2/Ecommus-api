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
exports.createCommentController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createCommentController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createCommentController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post_id, comment } = req.body;
    const post = yield models_1.Post.findById(post_id);
    if (!post) {
        return res.status(404).json({
            message: dictionary_1.default("POST_NOT_FOUND", "", language),
        });
    }
    const newCommet = { user: _id, comment };
    post.comments.push(newCommet);
    post.totalComments = post.comments.length;
    yield post.save();
    const post_commented = yield models_1.Post.findById(post_id).populate([
        { path: "comments.user", select: "fullname photo" },
        { path: "likes.user", select: "fullname photo" },
        { path: "author", select: "fullname photo" },
    ]);
    return res.status(200).json({
        message: dictionary_1.default("COMMENT_ADDED", "", language),
        post: post_commented,
    });
}));
//# sourceMappingURL=createComment.controller.js.map