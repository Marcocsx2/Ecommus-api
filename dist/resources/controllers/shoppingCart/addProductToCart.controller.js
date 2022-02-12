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
exports.addProductToCartController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.addProductToCartController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "addProductToCartController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const addProductToCart = yield models_1.ShoppingCart.create(Object.assign({ user: _id }, req.body));
    const newProductAdded = yield models_1.ShoppingCart.findOne({
        _id: addProductToCart._id,
    }).populate({
        path: "product",
        populate: { path: "author category subcategory" },
    });
    return res.status(201).json({
        message: dictionary_1.default("PRODUCT_ADDED", "ProductToCart", language),
        product: newProductAdded,
    });
}));
//# sourceMappingURL=addProductToCart.controller.js.map