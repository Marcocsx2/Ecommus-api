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
exports.estimateDeliveryController = void 0;
const axios_1 = require("../../../utils/axios");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.estimateDeliveryController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "estimateDeliveryController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { data: body } = req.body;
    const data = [];
    const amount = [];
    for (let i = 0; i < body.length; i++) {
        const element = body[i];
        const getProduct = yield models_1.Product.findById(element.product_id).populate("author", "fullname photo");
        const getAddress = yield models_1.Address.findById(element.address_id);
        const getWarehouse = yield models_1.Warehouse.findById(getProduct.warehouse);
        let structure = {
            product: getProduct,
            description: getProduct.name + " " + getProduct.trademark,
            addresses: [
                {
                    type: "PICKUP",
                    lat: getWarehouse.lat,
                    lon: getWarehouse.lon,
                    label: getWarehouse.address,
                },
                {
                    type: "DELIVERY",
                    lat: getAddress.lat,
                    lon: getAddress.lon,
                    label: getAddress.address,
                },
            ],
        };
        data.push(structure);
    }
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log("Elementos de delivery", element);
        yield axios_1.axiosGlovoClient({
            method: "POST",
            url: "/b2b/orders/estimate",
            data: {
                description: element.description,
                addresses: element.addresses,
            },
        })
            .then(({ data }) => {
            let structure = {
                product: element.product,
                data,
            };
            amount.push(structure);
        })
            .catch((err) => {
            console.log("Error en delivery", err);
            return res.status(400).json({
                message: "La dirección que selecciono no esta en el alcance del delivery",
            });
        });
    }
    return res.status(200).json({
        message: "Productos estimados",
        amount,
    });
}));
//# sourceMappingURL=estimateDelivery.controller.js.map