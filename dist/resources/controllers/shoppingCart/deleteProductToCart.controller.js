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
exports.deleteProductToCartController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.deleteProductToCartController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "deleteProductToCartController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { items } = req.body;
    const deletedProducts = [];
    for (let i = 0; i < items.length; i++) {
        const item_id = items[i];
        const getProduct = yield models_1.ShoppingCart.findOne({
            _id: item_id,
            user: _id,
        });
        if (!getProduct) {
            return res.status(404).json({
                message: dictionary_1.default("NOT_PRODUCT", "", language),
            });
        }
        const deletedProduct = yield models_1.ShoppingCart.findByIdAndDelete({
            _id: item_id,
        });
        if (!deletedProduct) {
            return res.status(500).json({
                message: dictionary_1.default("ERROR_CONTROLLER", "deleteProductToCartController", language),
            });
        }
        deletedProducts.push(deletedProduct);
    }
    return res.status(200).json({
        message: dictionary_1.default("DELETE", "", language),
        deletedProduct: deletedProducts,
    });
}));
//# sourceMappingURL=deleteProductToCart.controller.js.map