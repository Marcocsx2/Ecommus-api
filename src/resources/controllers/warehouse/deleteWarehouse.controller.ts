import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Product, Warehouse } from "../../models";

export const deleteWarehouseController = catchAsync(
  messages("ERROR_CONTROLLER", "deleteWarehouseController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { warehouse_id } = req.body;

    const existProduct = await Product.find({ warehouse_id });

    if (existProduct.length !== 0) {
      return res.status(404).json({
        message: messages("EXIST_PRODUCTS_WAREHOUSE", "", language),
      });
    }

    const warehouse = await Warehouse.findByIdAndRemove({ _id: warehouse_id });

    if (!warehouse) {
      return res.status(404).json({
        message: messages("NO_RESOURCES", "", language),
      });
    }

    return res.status(200).json({
      message: messages("DELETE", "warehouse", language),
      warehouse,
    });
  }
);
