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
exports.createProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const uploadFile_1 = require("../../../utils/uploadFile");
const models_1 = require("../../models");
exports.createProductController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "CreateProductController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { category_id, subcategory_id, warehouse_id } = req.body;
    const file = req.files.photo;
    if (!file) {
        return res.status(404).json({
            message: dictionary_1.default("IMAGE_REQUIRED", "image", language),
        });
    }
    const responseS3 = yield uploadFile_1.uploadFile(file, "product", _id);
    const newProductDB = yield models_1.Product.create(Object.assign({ author: _id, category: category_id, photo: responseS3, subcategory: subcategory_id, warehouse: warehouse_id }, req.body));
    const product = yield models_1.Product.findById(newProductDB._id).populate([
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user", select: "fullname photo" },
    ]);
    return res.status(201).json({
        message: dictionary_1.default("CREATE", newProductDB.name, language),
        product: product,
    });
}));
//# sourceMappingURL=createProduct.controller.js.map