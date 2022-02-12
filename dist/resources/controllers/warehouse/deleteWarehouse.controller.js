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
exports.deleteWarehouseController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.deleteWarehouseController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "deleteWarehouseController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { warehouse_id } = req.body;
    const existProduct = yield models_1.Product.find({ warehouse_id });
    if (existProduct.length !== 0) {
        return res.status(404).json({
            message: dictionary_1.default("EXIST_PRODUCTS_WAREHOUSE", "", language),
        });
    }
    const warehouse = yield models_1.Warehouse.findByIdAndRemove({ _id: warehouse_id });
    if (!warehouse) {
        return res.status(404).json({
            message: dictionary_1.default("NO_RESOURCES", "", language),
        });
    }
    return res.status(200).json({
        message: dictionary_1.default("DELETE", "warehouse", language),
        warehouse,
    });
}));
//# sourceMappingURL=deleteWarehouse.controller.js.map