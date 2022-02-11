import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { OrderDetail } from "../../models";

export const getOrderDetailByOrderController = catchAsync(
  messages(
    "ERROR_CONTROLLER",
    "getOrderDetailByOrderController",
    process.env.LAN
  ),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { order_id } = req.body;

    const orderDetails = await OrderDetail.find({ order_id })
      .populate({
        path: "product_id",
        populate: { path: "author category subcategory" },
      })
      .populate({ path: "order_id", populate: { path: "user_id" } });

    return res.status(200).json({
      message: messages("GET_ALL", "Order Detail", language),
      order_detail: orderDetails,
    });
  }
);
