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
exports.updateProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.updateProductController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "UpdateProductController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { product_id } = req.body;
    const updatedProductDB = yield models_1.Product.findByIdAndUpdate(product_id, Object.assign({}, req.body), { new: true }).populate([
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user", select: "fullname photo" },
    ]);
    return res.status(201).json({
        message: dictionary_1.default("UPDATE", updatedProductDB.name, language),
        product: updatedProductDB,
    });
}));
//# sourceMappingURL=updateProduct.controller.js.map