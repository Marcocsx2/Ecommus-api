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
exports.createReviewController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createReviewController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createReviewController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { product_id, rating, comment } = req.body;
    const product = yield models_1.Product.findById(product_id);
    if (!product) {
        return res.status(404).json({
            message: dictionary_1.default("NOT_PRODUCT", "", language),
        });
    }
    const alreadyReview = product.reviews.find((review) => review.user.toString() === _id.toString());
    if (alreadyReview) {
        return res.status(404).json({
            message: dictionary_1.default("ALREADY_REVIEWED", "", language),
        });
    }
    const review = {
        rating,
        comment,
        user: _id,
    };
    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
    yield product.save();
    const product_review = yield models_1.Product.findById(product_id).populate([
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user", select: "fullname photo" },
    ]);
    return res.status(200).json({
        message: dictionary_1.default("REVIEW_ADDED", "", language),
        product: product_review,
    });
}));
//# sourceMappingURL=createReview.controller.js.map