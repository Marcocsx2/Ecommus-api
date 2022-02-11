import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { ShoppingCart } from "../../models";

export const findShoppingCartController = catchAsync(
  messages("ERROR_CONTROLLER", "findShoppingCartController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const getShoppingCart = await ShoppingCart.find({ user: _id }).populate({
      path: "product",
      populate: { path: "author category subcategory" },
    });

    const activedProducts = await ShoppingCart.find({ isEnabled: true });

    return res.status(200).json({
      message: messages("OK", "findShoppingCart", language),
      shoppingCart: getShoppingCart,
      activedProducts: activedProducts.length,
    });
  }
);
