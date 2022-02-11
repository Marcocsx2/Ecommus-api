import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Product } from "../../models";

export const getProductController = catchAsync(
  messages("ERROR_CONTROLLER", "GetProductController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { page, limit } = req.body;

    const options = {
      select: ["-__v"],
      populate: [
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user", select: "fullname photo" },
        { path: "likes.user", select: "fullname photo" },
      ],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: "products", totalDocs: "totalProducts" },
      sort: { updatedAt: -1 },
    };

    const getProductDB: any = await Product.paginate({}, options);

    if (getProductDB.length === 0) {
      return res.status(200).json({
        message: messages("WITHOUT_RESULTS", "", language),
        data: getProductDB,
      });
    }

    return res.status(200).json({
      message: messages("GET_ALL", "Products", language),
      data: getProductDB,
    });
  }
);
