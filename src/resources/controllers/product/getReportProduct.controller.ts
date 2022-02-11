import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { ReportProduct } from "../../models";

export const getReportedProductsController = catchAsync(
  messages("ERROR_CONTROLLER", "getReportsController", process.env.NODE_ENV),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { page, limit } = req.body;

    const options = {
      select: ["-__v"],
      populate: [
        { path: "user", select: "fullname photo" },
        { path: "product" },
      ],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: "reports", totalDocs: "totalReport" },
      sort: { updatedAt: -1 },
    };

    const productsReported = await ReportProduct.paginate(
      { status: false },
      options
    );

    return res.status(200).json({
      message: messages("OK", "", language),
      reported_products: productsReported,
    });
  }
);
