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
exports.giveLikeProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const underscore_1 = __importDefault(require("underscore"));
const models_1 = require("../../models");
exports.giveLikeProductController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "giveLikeProductController", process.env.NODE_ENV), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { product_id } = req.body;
    const product = yield models_1.Product.findById(product_id);
    if (!product) {
        return res.status(404).json({
            message: dictionary_1.default("PRODUCT_NOT_FOUND", "", language),
        });
    }
    const isLiked = product.likes.find((like) => like.user.toString() === _id.toString());
    if (isLiked) {
        const index = underscore_1.default.findLastIndex(product.likes, isLiked);
        product.likes.splice(index, 1);
        product.totalLikes = product.likes.length;
        yield product.save();
        const product_liked = yield models_1.Product.findById(product_id).populate([
            { path: "author", select: "fullname photo" },
            { path: "category", select: "name" },
            { path: "subcategory", select: "name" },
            { path: "warehouse", select: "label" },
            { path: "reviews.user", select: "fullname photo" },
            { path: "likes.user", select: "fullname photo" },
        ]);
        return res.status(200).json({
            message: dictionary_1.default("OK", "", language),
            product: product_liked,
        });
    }
    product.likes.push({ user: _id });
    product.totalLikes = product.likes.length;
    yield product.save();
    const product_liked = yield models_1.Product.findById(product_id).populate([
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user", select: "fullname photo" },
        { path: "likes.user", select: "fullname photo" },
    ]);
    return res.status(200).json({
        message: dictionary_1.default("OK", "", language),
        product: product_liked,
    });
}));
//# sourceMappingURL=giveLikeProduct.controller.js.map