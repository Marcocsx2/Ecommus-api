import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Warehouse } from "../../models";

export const createWarehouseController = catchAsync(
  messages("ERROR_CONTROLLER", "createWarehouseController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { label, address } = req.body;

    const warehouseByUser = await Warehouse.find({ user_id: _id });

    // Validación : Usuario solo puede contar con 4 almacenes
    if (warehouseByUser && warehouseByUser.length >= 4) {
      return res.status(400).json({
        message: "Has llegado al limite de almacenes por usuario",
      });
    }

    // Validación : Usuario no puede repetir el nombre del almacen
    for (let x = 0; x < warehouseByUser.length; x++) {
      if (warehouseByUser[x].label === label) {
        return res.status(400).json({
          message: "No puedes tener dos almacenes con el mismo nombre",
        });
      }
      if (warehouseByUser[x].address === address) {
        return res.status(400).json({
          message: "No puedes tener dos almacenes con la misma dirección",
        });
      }
    }

    const newWarehouse = await Warehouse.create({ user_id: _id, ...req.body });

    return res.status(200).json({
      message: messages("OK", "Warehouse", language),
      warehouse: newWarehouse,
    });
  }
);
