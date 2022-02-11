import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Address } from "../../models";

export const deleteAddressController = catchAsync(
  messages("ERROR_CONTROLLER", "deleteAddressController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { address_id } = req.body;

    const address = await Address.findByIdAndRemove({ _id: address_id });

    if (!address) {
      return res.status(404).json({
        message: messages("NO_RESOURCES", "", language),
      });
    }

    return res.status(200).json({
      message: messages("DELETE", "dirección", language),
      address,
    });
  }
);
