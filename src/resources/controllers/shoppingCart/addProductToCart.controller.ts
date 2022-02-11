import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { ShoppingCart } from "../../models";

export const addProductToCartController = catchAsync(
  messages("ERROR_CONTROLLER", "addProductToCartController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const addProductToCart = await ShoppingCart.create({
      user: _id,
      ...req.body,
    });

    const newProductAdded = await ShoppingCart.findOne({
      _id: addProductToCart._id,
    }).populate({
      path: "product",
      populate: { path: "author category subcategory" },
    });

    return res.status(201).json({
      message: messages("PRODUCT_ADDED", "ProductToCart", language),
      product: newProductAdded,
    });
  }
);
