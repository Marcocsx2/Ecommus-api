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
exports.getProductByIdController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.getProductByIdController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "GetProductByIdController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { product_id } = req.body;
    const getProductByIdDB = yield models_1.Product.findById(product_id)
        .sort({ createdAt: -1 })
        .populate({ path: "author", select: "fullname photo" })
        .populate({ path: "category", select: "name" })
        .populate({ path: "subcategory", select: "name" })
        .populate({ path: "warehouse" })
        .populate({ path: "reviews.user", select: "fullname photo" })
        .lean()
        .exec();
    if (!getProductByIdDB) {
        return res.status(200).json({
            message: dictionary_1.default("WITHOUT_RESULTS", "", language),
            data: [],
        });
    }
    return res.status(200).json({
        message: dictionary_1.default("GET", "Product", language),
        data: getProductByIdDB,
    });
}));
//# sourceMappingURL=getProductById.controller.js.map