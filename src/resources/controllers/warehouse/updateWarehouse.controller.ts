import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Warehouse } from "../../models";

export const updateWarehouseController = catchAsync(
  messages("ERROR_CONTROLLER", "updateWarehouseController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { warehouse_id } = req.body;

    const updateWarehouse = await Warehouse.findByIdAndUpdate(
      warehouse_id,
      { ...req.body },
      { new: true }
    ).populate({
      path: "user_id",
      select: "fullname photo",
    });

    if (!updateWarehouse) {
      return res.status(404).json({
        message: messages("NO_RESOURCES", "", language),
      });
    }

    return res.status(200).json({
      message: messages("UPDATE", "address", language),
      address: updateWarehouse,
    });
  }
);
