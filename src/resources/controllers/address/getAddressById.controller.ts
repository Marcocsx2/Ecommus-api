import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Address } from "../../models";

export const getAddressByIdController = catchAsync(
  messages("ERROR_CONTROLLER", "findAddressByIdController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { address_id } = req.body;

    const getAddress = await Address.findOne({
      user_id: _id,
      _id: address_id,
    }).populate({
      path: "user_id",
      select: "fullname photo",
    });

    if (!getAddress) {
      return res.status(404).json({
        message: messages("INSUFFICIENT_PERMISSIONS", "", language),
      });
    }

    return res.status(200).json({
      message: messages("GET", "Address", language),
      address: getAddress,
    });
  }
);
