import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Product } from "../../models";

export const getProductByIdController = catchAsync(
  messages("ERROR_CONTROLLER", "GetProductByIdController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { product_id } = req.body;

    const getProductByIdDB = await Product.findById(product_id)
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "fullname photo" })
      .populate({ path: "category", select: "name" })
      .populate({ path: "subcategory", select: "name" })
      .populate({ path: "warehouse" })
      .populate({ path: "reviews.user", select: "fullname photo" })
      .lean()
      .exec();

    if (!getProductByIdDB) {
      return res.status(200).json({
        message: messages("WITHOUT_RESULTS", "", language),
        data: [],
      });
    }

    return res.status(200).json({
      message: messages("GET", "Product", language),
      data: getProductByIdDB,
    });
  }
);
