import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import _ from "underscore";
import { Product } from "../../models";

export const giveLikeProductController = catchAsync(
  messages(
    "ERROR_CONTROLLER",
    "giveLikeProductController",
    process.env.NODE_ENV
  ),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { product_id } = req.body;

    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(404).json({
        message: messages("PRODUCT_NOT_FOUND", "", language),
      });
    }
    const isLiked = product.likes.find(
      (like: any) => like.user.toString() === _id.toString()
    );

    if (isLiked) {
      const index = _.findLastIndex(product.likes, isLiked);

      product.likes.splice(index, 1);

      product.totalLikes = product.likes.length;

      await product.save();

      const product_liked = await Product.findById(product_id).populate([
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user", select: "fullname photo" },
        { path: "likes.user", select: "fullname photo" },
      ]);

      return res.status(200).json({
        message: messages("OK", "", language),
        product: product_liked,
      });
    }

    product.likes.push({ user: _id });

    product.totalLikes = product.likes.length;

    await product.save();

    const product_liked = await Product.findById(product_id).populate([
      { path: "author", select: "fullname photo" },
      { path: "category", select: "name" },
      { path: "subcategory", select: "name" },
      { path: "warehouse", select: "label" },
      { path: "reviews.user", select: "fullname photo" },
      { path: "likes.user", select: "fullname photo" },
    ]);

    return res.status(200).json({
      message: messages("OK", "", language),
      product: product_liked,
    });
  }
);
