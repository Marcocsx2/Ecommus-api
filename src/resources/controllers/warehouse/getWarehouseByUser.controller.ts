import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Warehouse } from "../../models";

export const getWarehouseByUserController = catchAsync(
  messages("ERROR_CONTROLLER", "getWarehouseByUserController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const warehouse = await Warehouse.find({ user_id: _id }).populate({
      path: "user_id",
      select: "fullname photo",
    });

    return res.status(200).json({
      message: messages("OK", "Warehouse", language),
      warehouse,
    });
  }
);
