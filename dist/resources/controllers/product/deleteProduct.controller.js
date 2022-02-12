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
exports.deleteProductController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const deleteFile_1 = require("../../../utils/deleteFile");
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.deleteProductController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "CreateProductController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { product_id } = req.body;
    const { _id } = req.user;
    const findProductDB = yield models_1.Product.findById(product_id);
    if (!findProductDB) {
        return res.status(404).json({
            message: dictionary_1.default("NOT_PRODUCT", "", language),
        });
    }
    if (String(findProductDB.author) !== String(_id)) {
        return res.status(403).json({
            message: dictionary_1.default("UNAUTHORIZED", "", language),
        });
    }
    const deletePhoto = yield deleteFile_1.deleteFile(findProductDB.photo);
    console.log(deletePhoto);
    if (!deletePhoto) {
        return res.status(500).json({
            message: "Error al eliminar las fotos",
        });
    }
    const productDeletedDB = yield models_1.Product.findByIdAndDelete(product_id);
    return res.status(200).json({
        message: dictionary_1.default("DELETE", `${findProductDB.name}`, language),
        data: productDeletedDB,
    });
}));
//# sourceMappingURL=deleteProduct.controller.js.map