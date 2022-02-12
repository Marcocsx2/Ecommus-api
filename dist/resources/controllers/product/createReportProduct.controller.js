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
exports.createReportProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createReportProductController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createReportProductController", process.env.NODE_ENV), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { product } = req.body;
    const productExist = yield models_1.Product.findById(product);
    if (!productExist) {
        return res.status(404).json({
            message: dictionary_1.default("NOT_PRODUCT", "", language),
        });
    }
    const newReportedProduct = yield models_1.ReportProduct.create(Object.assign({ user: _id }, req.body));
    const reportedProduct = yield models_1.ReportProduct.findById(newReportedProduct._id).populate([{ path: "user", select: "fullname photo" }, { path: "product" }]);
    return res.status(201).json({
        message: dictionary_1.default("OK", "", language),
        reported_product: reportedProduct,
    });
}));
//# sourceMappingURL=createReportProduct.controller.js.map