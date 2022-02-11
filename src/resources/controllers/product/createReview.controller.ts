import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Product } from "../../models";

export const createReviewController = catchAsync(
  messages("ERROR_CONTROLLER", "createReviewController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const { product_id, rating, comment } = req.body;

    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(404).json({
        message: messages("NOT_PRODUCT", "", language),
      });
    }

    // Valida que el usuario logueado tenga ya una reseaña en el producto
    const alreadyReview = product.reviews.find(
      (review: any) => review.user.toString() === _id.toString()
    );

    if (alreadyReview) {
      return res.status(404).json({
        message: messages("ALREADY_REVIEWED", "", language),
      });
    }

    //Guardar una reseña
    const review = {
      rating,
      comment,
      user: _id,
    };

    product.reviews.push(review);
    product.totalReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    const product_review = await Product.findById(product_id).populate([
      { path: "author", select: "fullname photo" },
      { path: "category", select: "name" },
      { path: "subcategory", select: "name" },
      { path: "warehouse", select: "label" },
      { path: "reviews.user", select: "fullname photo" },
    ]);

    return res.status(200).json({
      message: messages("REVIEW_ADDED", "", language),
      product: product_review,
    });
  }
);
