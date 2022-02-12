"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
let validState = {
    values: ["Inactivo", "Activo", "Agotado"],
    message: "{VALUE} no es un estado valido",
};
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const likeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "User",
    },
}, { timestamps: true });
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    trademark: {
        type: String,
        required: true,
    },
    photo: {
        type: Array,
        default: "https://wws.com.pa/wp-content/plugins/wordpress-ecommerce/marketpress-includes/images/default-product.png",
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    state: {
        type: String,
        default: "Activo",
        enum: validState,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    detail: {
        type: mongoose_1.Schema.Types.String,
        default: "<p> No detail </p>",
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        default: "<p> No description </p>",
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subcategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
    },
    warehouse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
    reviews: [reviewSchema],
    likes: [likeSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    totalReviews: {
        type: Number,
        requiered: true,
        default: 0,
    },
    totalLikes: {
        type: Number,
        requiered: true,
        default: 0,
    },
}, { timestamps: true });
productSchema.plugin(mongoose_paginate_v2_1.default);
const Product = mongoose_1.model("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map