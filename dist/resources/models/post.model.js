"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const ts_mongoose_pagination_1 = require("ts-mongoose-pagination");
const commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    comment: { type: String, required: true },
}, { timestamps: true });
const likeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User",
    },
}, { timestamps: true });
let postSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.default.Types.ObjectId,
        required: [true, "author is required"],
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    image: { type: String, required: true },
    comments: [commentSchema],
    likes: [likeSchema],
    totalLikes: {
        type: Number,
        required: true,
        default: 0,
    },
    totalComments: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });
postSchema.plugin(ts_mongoose_pagination_1.mongoosePagination);
const Post = mongoose_1.model("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=post.model.js.map