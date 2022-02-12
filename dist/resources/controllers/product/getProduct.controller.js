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
exports.getProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.getProductController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "GetProductController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { page, limit } = req.body;
    const options = {
        select: ["-__v"],
        populate: [
            { path: "author", select: "fullname photo" },
            { path: "category", select: "name" },
            { path: "subcategory", select: "name" },
            { path: "warehouse", select: "label" },
            { path: "reviews.user", select: "fullname photo" },
            { path: "likes.user", select: "fullname photo" },
        ],
        page: page || 1,
        limit: limit || 10,
        lean: true,
        customLabels: { docs: "products", totalDocs: "totalProducts" },
        sort: { updatedAt: -1 },
    };
    const getProductDB = yield models_1.Product.paginate({}, options);
    if (getProductDB.length === 0) {
        return res.status(200).json({
            message: dictionary_1.default("WITHOUT_RESULTS", "", language),
            data: getProductDB,
        });
    }
    return res.status(200).json({
        message: dictionary_1.default("GET_ALL", "Products", language),
        data: getProductDB,
    });
}));
//# sourceMappingURL=getProduct.controller.js.map