import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { ShoppingCart } from "../../models";

export const changeShoppingCartStateController = catchAsync(
  messages(
    "ERROR_CONTROLLER",
    "changeShoppingCartStateController",
    process.env.LAN
  ),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { item_id } = req.body;

    const findItem = await ShoppingCart.findById(item_id);

    if (!findItem) {
      return res.status(404).json({
        message: messages("NOT_PRODUCT", "product", language),
      });
    }

    const stateChanged = await ShoppingCart.findByIdAndUpdate(
      item_id,
      {
        isEnabled: !findItem.isEnabled,
      },
      { new: true }
    ).populate({
      path: "product",
      populate: { path: "author category subcategory" },
    });

    return res.status(200).json({
      message: messages("OK", "statement", language),
      data: stateChanged,
    });
  }
);
