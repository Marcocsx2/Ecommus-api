import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Address } from "../../models";

export const createAddressController = catchAsync(
  messages("ERROR_CONTROLLER", "createAddressController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { label, address } = req.body;

    const addressByUser = await Address.find({ user_id: _id });

    // Validación : Usuario solo puede contar con 4 direcciones de envio
    if (addressByUser && addressByUser.length >= 4) {
      return res.status(404).json({
        message: "Has llegado al limite de direciones por usuario",
      });
    }

    // Validación : Usuario no puede repetir el nombre de la direccion de envio
    for (let x = 0; x < addressByUser.length; x++) {
      if (addressByUser[x].label === label) {
        return res.status(400).json({
          message: "No puedes tener dos lugares de envio con el mismo nombre",
        });
      }
      if (addressByUser[x].address === address) {
        return res.status(400).json({
          message: "No puedes tener dos lugares de envio con la misma dirección",
        });
      }
    }

    const newAddress = await Address.create({ user_id: _id, ...req.body });

    return res.status(200).json({
      message: messages("OK", "Address", language),
      address: newAddress,
    });
  }
);
