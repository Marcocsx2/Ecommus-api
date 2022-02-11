import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Address } from "../../models";

export const getAddressByUserController = catchAsync(
  messages("ERROR_CONTROLLER", "getAddressByUserController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const address = await Address.find({ user_id: _id }).populate({
      path: "user_id",
      select: "fullname photo",
    });

    return res.status(200).json({
      message: messages("OK", "Address", language),
      address,
    });
  }
);
