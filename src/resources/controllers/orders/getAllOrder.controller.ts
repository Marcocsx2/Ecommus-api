import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Order } from "../../models";

export const getAllOrderController = catchAsync(
  messages("ERROR_CONTROLLER", "getAllOrderController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { page, limit } = req.body;

    const options = {
      select: ["-__v"],
      populate: [
        { path: "user_id", select: "fullname photo" },
        { path: "address_id", select: "country city region address" },
      ],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: "orders", totalDocs: "totalOrders" },
      sort: { updatedAt: -1 },
    };

    const orders: any = await Order.paginate({}, options);

    return res.status(200).json({
      message: messages("OK", "", language),
      ...orders,
    });
  }
);
