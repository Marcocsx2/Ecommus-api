import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Address } from "../../models";

export const updateAddressController = catchAsync(
  messages("ERROR_CONTROLLER", "updateAddressController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { address_id } = req.body;

    const updateAddress = await Address.findByIdAndUpdate(
      address_id,
      { ...req.body },
      { new: true }
    ).populate({
      path: "user_id",
      select: "fullname photo",
    });

    if (!updateAddress) {
      return res.status(404).json({
        message: messages("NO_RESOURCES", "", language),
      });
    }

    return res.status(200).json({
      message: messages("UPDATE", "address", language),
      address: updateAddress,
    });
  }
);
