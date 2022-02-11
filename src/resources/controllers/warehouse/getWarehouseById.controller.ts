import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Warehouse } from "../../models";

export const getWarehouseByIdController = catchAsync(
  messages("ERROR_CONTROLLER", "findAddressByIdController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { warehouse_id } = req.body;

    const getWarehouse = await Warehouse.findOne({
      user_id: _id,
      _id: warehouse_id,
    }).populate({
      path: "user_id",
      select: "fullname photo",
    });
    
    if (!getWarehouse) {
      return res.status(404).json({
        message: messages("INSUFFICIENT_PERMISSIONS", "", language),
      });
    }

    return res.status(200).json({
      message: messages("GET", "Warehouse", language),
      address: getWarehouse,
    });
  }
);
