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
exports.createAddressController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createAddressController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createAddressController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { label, address } = req.body;
    const addressByUser = yield models_1.Address.find({ user_id: _id });
    if (addressByUser && addressByUser.length >= 4) {
        return res.status(404).json({
            message: "Has llegado al limite de direciones por usuario",
        });
    }
    for (let x = 0; x < addressByUser.length; x++) {
        if (addressByUser[x].label === label) {
            return res.status(400).json({
                message: "No puedes tener dos lugares de envio con el mismo nombre",
            });
        }
        if (addressByUser[x].address === address) {
            return res.status(400).json({
                message: "No puedes tener dos lugares de envio con la misma dirección",
            });
        }
    }
    const newAddress = yield models_1.Address.create(Object.assign({ user_id: _id }, req.body));
    return res.status(200).json({
        message: dictionary_1.default("OK", "Address", language),
        address: newAddress,
    });
}));
//# sourceMappingURL=createAddress.controller.js.map