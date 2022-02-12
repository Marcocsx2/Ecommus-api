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
exports.getProductBySearchController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.getProductBySearchController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "getProductBySearchController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { page, limit, sort, where: wher } = req.body;
    const { filter, value: val } = sort;
    const { field, value } = wher;
    const orderBy = (filter, val) => {
        switch (filter) {
            case "name":
                return { name: val };
            case "price":
                return { price: val };
            default:
                return { name: val };
        }
    };
    const where = (field, value) => __awaiter(void 0, void 0, void 0, function* () {
        switch (field) {
            case "name":
                return { name: { $regex: value } };
            case "subcategory":
                return { subcategory: value };
            case "trademark":
                return { trademark: { $regex: value } };
            default:
                return {};
        }
    });
    const options = {
        select: ["-__v"],
        populate: [
            { path: "author", select: "fullname photo" },
            { path: "category", select: "name" },
            { path: "subcategory", select: "name" },
            { path: "warehouse", select: "label" },
            { path: "reviews.user", select: "fullname photo" },
        ],
        page: page || 1,
        limit: limit || 10,
        lean: true,
        customLabels: { docs: "products", totalDocs: "totalProducts" },
        sort: orderBy(filter, val),
    };
    const getProductDB = yield models_1.Product.paginate(yield where(field, value), options);
    if (getProductDB.length === 0) {
        return res.status(200).json({
            message: dictionary_1.default("WITHOUT_RESULTS", "", language),
            data: getProductDB,
        });
    }
    return res.status(200).json({
        message: dictionary_1.default("GET", "Product", language),
        data: getProductDB,
    });
}));
//# sourceMappingURL=getProductBySearch.controller.js.map