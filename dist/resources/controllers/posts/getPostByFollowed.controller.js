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
exports.getPostByFollowedController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
const getPost = (followeds) => __awaiter(void 0, void 0, void 0, function* () {
    var posts = [];
    for (let i = 0; i < followeds.length; i++) {
        const { user_id } = followeds[i];
        const findPost = yield models_1.Post.find({ author: user_id }).populate([
            { path: "author", select: "fullname photo" },
            { path: "comments.user", select: "fullname photo" },
            { path: "likes.user", select: "fullname photo" },
        ]);
        for (let i = 0; i < findPost.length; i++) {
            posts.push(findPost[i]);
        }
    }
    return posts;
});
exports.getPostByFollowedController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "getPostByFollowedController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const getFollowed = yield models_1.Follower.find({ follower_id: _id });
    const posts = yield getPost(getFollowed);
    return res.status(200).json({
        message: dictionary_1.default("GET_ALL", "Posts", language),
        data: posts,
    });
}));
//# sourceMappingURL=getPostByFollowed.controller.js.map