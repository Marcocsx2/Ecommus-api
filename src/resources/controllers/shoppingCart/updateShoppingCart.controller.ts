import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { ShoppingCart } from "../../models";

export const updateShoppingCartController = catchAsync(
  messages("ERROR_CONTROLLER", "updateShoppingCartController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { item_id } = req.body;

    const findIfExists = await ShoppingCart.findById(item_id);

    if (!findIfExists) {
      return res.status(400).json({
        message: messages("NOT_PRODUCT", "product", language),
      });
    }

    const shoppingCartUpdated = await ShoppingCart.findByIdAndUpdate(
      { _id: item_id },
      { ...req.body },
      {new: true}
    ).populate({
      path: "product",
      populate: { path: "author category subcategory" },
    });

    return res.status(200).json({
      message: messages("OK"),
      data: shoppingCartUpdated,
    });
  }
);
