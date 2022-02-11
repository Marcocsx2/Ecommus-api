import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { OrderDetail } from "../../models";

export const createOrderDetailController = catchAsync(
  messages("ERROR_CONTROLLER", "createOrderDetailController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;

    const newOrderDetail = await OrderDetail.create({ ...req.body });

    return res.status(200).json({
      message: messages("CREATE", "OrderDetail", language),
      order_detail: newOrderDetail,
    });
  }
);
