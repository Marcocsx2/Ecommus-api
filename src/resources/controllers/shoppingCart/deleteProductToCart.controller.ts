import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { ShoppingCart } from "../../models";

export const deleteProductToCartController = catchAsync(
  messages(
    "ERROR_CONTROLLER",
    "deleteProductToCartController",
    process.env.LAN
  ),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { items } = req.body;
    const deletedProducts = [];

    for (let i = 0; i < items.length; i++) {
      const item_id = items[i];

      const getProduct = await ShoppingCart.findOne({
        _id: item_id,
        user: _id,
      });

      if (!getProduct) {
        return res.status(404).json({
          message: messages("NOT_PRODUCT", "", language),
        });
      }

      const deletedProduct = await ShoppingCart.findByIdAndDelete({
        _id: item_id,
      });

      if (!deletedProduct) {
        return res.status(500).json({
          message: messages(
            "ERROR_CONTROLLER",
            "deleteProductToCartController",
            language
          ),
        });
      }

      deletedProducts.push(deletedProduct);
    }

    return res.status(200).json({
      message: messages("DELETE", "", language),
      deletedProduct: deletedProducts,
    });
  }
);
