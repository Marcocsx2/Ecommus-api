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
exports.createPostController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const uploadFile_1 = require("../../../utils/uploadFile");
const models_1 = require("../../models");
exports.createPostController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createPost", process.env.NODE_ENV), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const file = req.files.image;
    if (!_id) {
        return res.status(400).json({
            message: dictionary_1.default("USER_UNDEFINED", "", language),
        });
    }
    const responseS3 = yield uploadFile_1.uploadOneFile(file, "posts", _id);
    const newPostDB = yield models_1.Post.create(Object.assign({ author: _id, image: responseS3.Location }, req.body));
    const PostCreated = yield models_1.Post.findById(newPostDB._id).populate([
        { path: "author", select: "fullname photo" },
        { path: "comments.user", select: "fullname photo" },
    ]);
    return res.status(201).json({
        message: dictionary_1.default("CREATE", PostCreated.title, language),
        post: PostCreated,
    });
}));
//# sourceMappingURL=createPost.controller.js.map