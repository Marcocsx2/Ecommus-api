import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Order, OrderDetail } from "../../models";

export const createOrderController = catchAsync(
  messages("ERROR_CONTROLLER", "createOrderController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { order, order_detail } = req.body;
    const { _id } = req.user;
    const order_details = [];

    const newOrder = await Order.create({
      user_id: _id,
      ...order,
      order_date: new Date(),
    });

    for (let i = 0; i < order_detail.length; i++) {
      const detail = order_detail[i];

      const newOrderDetail = await OrderDetail.create({
        ...detail,
        order_id: newOrder._id,
      });

      order_details.push(newOrderDetail);
    }

    return res.status(200).json({
      message: messages("CREATE", "order", language),
      order: newOrder,
      order_detail: order_details,
    });
  }
);
