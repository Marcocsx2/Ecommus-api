import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { uploadFile } from "../../../utils/uploadFile";
import { Product } from "../../models";

export const createProductController = catchAsync(
  messages("ERROR_CONTROLLER", "CreateProductController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { category_id, subcategory_id, warehouse_id } = req.body;

    const file = req.files.photo;

    if (!file) {
      return res.status(404).json({
        message: messages("IMAGE_REQUIRED", "image", language),
      });
    }

    const responseS3 = await uploadFile(file, "product", _id);

    const newProductDB: any = await Product.create({
      author: _id,
      category: category_id,
      photo: responseS3,
      subcategory: subcategory_id,
      warehouse: warehouse_id,
      ...req.body,
    });

    const product = await Product.findById(newProductDB._id).populate([
      { path: "author", select: "fullname photo" },
      { path: "category", select: "name" },
      { path: "subcategory", select: "name" },
      { path: "warehouse", select: "label" },
      { path: "reviews.user",select: "fullname photo" },
    ]);

    return res.status(201).json({
      message: messages("CREATE", newProductDB.name, language),
      product: product,
    });
  }
);
