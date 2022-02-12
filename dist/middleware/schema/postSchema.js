"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportedPostSchema = exports.createReportPostSchema = exports.giveLikeSchema = exports.createCommentSchema = exports.getPostByUserSchema = exports.getPostSchema = exports.deletePostSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.createPostSchema = baseSchema_1.baseSchema({
    body: {
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
    },
    files: {
        image: joi_1.default.object().required(),
    },
});
exports.updatePostSchema = baseSchema_1.baseSchema({
    body: {
        post_id: hexStringSchema_1.hexStringSchema.required(),
        title: joi_1.default.string(),
        description: joi_1.default.string(),
    },
    files: {
        image: joi_1.default.object(),
    },
});
exports.deletePostSchema = baseSchema_1.baseSchema({
    body: {
        post_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.getPostSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
    },
});
exports.getPostByUserSchema = baseSchema_1.baseSchema({
    body: {
        author_id: hexStringSchema_1.hexStringSchema.required(),
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
    },
});
exports.createCommentSchema = baseSchema_1.baseSchema({
    body: {
        post_id: hexStringSchema_1.hexStringSchema.required(),
        comment: joi_1.default.string().trim().required(),
    },
});
exports.giveLikeSchema = baseSchema_1.baseSchema({
    body: {
        post_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.createReportPostSchema = baseSchema_1.baseSchema({
    body: {
        post: hexStringSchema_1.hexStringSchema.required(),
        description: joi_1.default.string().trim().required(),
    },
});
exports.getReportedPostSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive()
    }
});
//# sourceMappingURL=postSchema.js.map