import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Order, OrderDetail } from "../../models";

export const getOrderByUserController = catchAsync(
  messages("ERROR_CONTROLLER", "getOrderByUserController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const ListOrderDetail = [];

    const orders = await Order.find({ user_id: _id })
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

      const orderDetails = await OrderDetail.find({
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
      message: messages("GET_ALL", "orders", language),
      orders: ListOrderDetail,
    });
  }
);
