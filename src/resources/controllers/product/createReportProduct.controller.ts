import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Product, ReportProduct } from "../../models";

export const createReportProductController = catchAsync(
  messages(
    "ERROR_CONTROLLER",
    "createReportProductController",
    process.env.NODE_ENV
  ),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { product } = req.body;

    const productExist = await Product.findById(product);

    if (!productExist) {
      return res.status(404).json({
        message: messages("NOT_PRODUCT", "", language),
      });
    }

    const newReportedProduct = await ReportProduct.create({
      user: _id,
      ...req.body,
    });

    const reportedProduct = await ReportProduct.findById(
      newReportedProduct._id
    ).populate([{ path: "user", select: "fullname photo" }, { path: "product" }]);

    return res.status(201).json({
      message: messages("OK", "", language),
      reported_product: reportedProduct,
    });
  }
);
