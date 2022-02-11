import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Product } from "../../models";

export const getProductBySearchController = catchAsync(
  messages("ERROR_CONTROLLER", "getProductBySearchController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { page, limit, sort, where: wher } = req.body;

    const { filter, value: val } = sort;

    const { field, value } = wher;

    const orderBy = (filter, val) => {
      switch (filter) {
        case "name":
          return { name: val };
        case "price":
          return { price: val };
        default:
          return { name: val };
      }
    };

    const where = async (field, value) => {
      switch (field) {
        case "name":
          return { name: { $regex: value } };
        case "subcategory":
          return { subcategory: value };
        case "trademark":
          return { trademark: { $regex: value } };
        default:
          return {};
      }
    };

    const options = {
      select: ["-__v"],
      populate: [
        { path: "author", select: "fullname photo" },
        { path: "category", select: "name" },
        { path: "subcategory", select: "name" },
        { path: "warehouse", select: "label" },
        { path: "reviews.user",select: "fullname photo" },
      ],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: "products", totalDocs: "totalProducts" },
      sort: orderBy(filter, val),
    };

    const getProductDB: any = await Product.paginate(
      await where(field, value),
      options
    );

    if (getProductDB.length === 0) {
      return res.status(200).json({
        message: messages("WITHOUT_RESULTS", "", language),
        data: getProductDB,
      });
    }

    return res.status(200).json({
      message: messages("GET", "Product", language),
      data: getProductDB,
    });
  }
);
