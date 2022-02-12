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
exports.createPaymentController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const mercadopago_1 = __importDefault(require("mercadopago"));
const models_1 = require("../../models");
mercadopago_1.default.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN);
exports.createPaymentController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createPaymentController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { payment_data, order_id } = req.body;
    const existOrder = yield models_1.Order.findById(order_id);
    if (!existOrder) {
        return res.status(404).json({
            message: dictionary_1.default("ORDER_NOT_EXIST", "", language),
        });
    }
    if (existOrder.state !== "PENDING") {
        return res.status(404).json({
            message: dictionary_1.default("ORDER_USED", "", language),
        });
    }
    yield mercadopago_1.default.payment
        .save(Object.assign(Object.assign({}, payment_data), { transaction_amount: Number(existOrder.payment_amount) }))
        .then(({ response }) => __awaiter(void 0, void 0, void 0, function* () {
        if (response.status === "approved" ||
            response.status === "pending" ||
            response.status === "in_process") {
            const newPayment = yield models_1.Payment.create(Object.assign(Object.assign({}, response), { order_id, payment_id: response.id }));
            yield models_1.Order.findByIdAndUpdate(order_id, { state: "IN_PROGRESS" });
            return res.status(200).json({
                message: dictionary_1.default("OK", "", language),
                payment: newPayment,
            });
        }
        yield models_1.Order.findByIdAndRemove(order_id);
        yield models_1.OrderDetail.deleteMany({ order_id: order_id });
        return res.status(400).json({
            message: dictionary_1.default("FAILED_PAYMENT", "", language),
            status: response.status,
            status_detail: response.status_detail,
        });
    }))
        .catch((err) => {
        return res.status(400).json(err);
    });
}));
//# sourceMappingURL=createPayment.controller.js.map