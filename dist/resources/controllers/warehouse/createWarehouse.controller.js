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
exports.createWarehouseController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createWarehouseController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createWarehouseController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { label, address } = req.body;
    const warehouseByUser = yield models_1.Warehouse.find({ user_id: _id });
    if (warehouseByUser && warehouseByUser.length >= 4) {
        return res.status(400).json({
            message: "Has llegado al limite de almacenes por usuario",
        });
    }
    for (let x = 0; x < warehouseByUser.length; x++) {
        if (warehouseByUser[x].label === label) {
            return res.status(400).json({
                message: "No puedes tener dos almacenes con el mismo nombre",
            });
        }
        if (warehouseByUser[x].address === address) {
            return res.status(400).json({
                message: "No puedes tener dos almacenes con la misma dirección",
            });
        }
    }
    const newWarehouse = yield models_1.Warehouse.create(Object.assign({ user_id: _id }, req.body));
    return res.status(200).json({
        message: dictionary_1.default("OK", "Warehouse", language),
        warehouse: newWarehouse,
    });
}));
//# sourceMappingURL=createWarehouse.controller.js.map