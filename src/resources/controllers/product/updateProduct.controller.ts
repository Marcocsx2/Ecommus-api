import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { uploadFile } from "../../../utils/uploadFile";
import { Product } from "../../models";

export const updateProductController = catchAsync(
  messages("ERROR_CONTROLLER", "UpdateProductController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { product_id } = req.body;

    // const file = req.files.photo;

    // if (!file) {
    //   return res.status(404).json({
    //     message: messages("IMAGE_REQUIRED", "image", language),
    //   });
    // }

    // const responseS3 = await uploadFile(file, "product", _id);

    const updatedProductDB = await Product.findByIdAndUpdate(
      product_id,
      {
        ...req.body,
      },
      { new: true }
    ).populate([
      { path: "author", select: "fullname photo" },
      { path: "category", select: "name" },
      { path: "subcategory", select: "name" },
      { path: "warehouse", select: "label" },
      { path: "reviews.user",select: "fullname photo" },
    ]);

    return res.status(201).json({
      message: messages("UPDATE", updatedProductDB.name, language),
      product: updatedProductDB,
    });
  }
);
