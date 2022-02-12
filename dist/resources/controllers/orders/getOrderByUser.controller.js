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
exports.getOrderByUserController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.getOrderByUserController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "getOrderByUserController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const ListOrderDetail = [];
    const orders = yield models_1.Order.find({ user_id: _id })
        .populate([
        {
            path: "user_id",
            select: "fullname photo",
        },
        { path: "address_id" },
    ])
        .sort({ updatedAt: -1 });
    const orderList = orders.filter((orde) => orde.state !== "PENDING");
    for (let i = 0; i < orderList.length; i++) {
        const element = orderList[i];
        const orderDetails = yield models_1.OrderDetail.find({
            order_id: element._id,
        })
            .populate({
            path: "product_id",
            populate: { path: "author" },
        })
            .populate({ path: "order_id", populate: { path: "user_id" } });
        ListOrderDetail.push({ order: element, orderDetails });
    }
    return res.status(200).json({
        message: dictionary_1.default("GET_ALL", "orders", language),
        orders: ListOrderDetail,
    });
}));
//# sourceMappingURL=getOrderByUser.controller.js.map