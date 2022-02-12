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
exports.createOrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createOrderController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createOrderController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { order, order_detail } = req.body;
    const { _id } = req.user;
    const order_details = [];
    const newOrder = yield models_1.Order.create(Object.assign(Object.assign({ user_id: _id }, order), { order_date: new Date() }));
    for (let i = 0; i < order_detail.length; i++) {
        const detail = order_detail[i];
        const newOrderDetail = yield models_1.OrderDetail.create(Object.assign(Object.assign({}, detail), { order_id: newOrder._id }));
        order_details.push(newOrderDetail);
    }
    return res.status(200).json({
        message: dictionary_1.default("CREATE", "order", language),
        order: newOrder,
        order_detail: order_details,
    });
}));
//# sourceMappingURL=createOrder.controller.js.map