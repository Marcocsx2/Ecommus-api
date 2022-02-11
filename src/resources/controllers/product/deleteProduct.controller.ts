import catchAsync from "../../../utils/catchAsync";
import { deleteFile } from "../../../utils/deleteFile";
import messages from "../../../utils/dictionary";
import { Product } from "../../models";

export const deleteProductController = catchAsync(
  messages("ERROR_CONTROLLER", "CreateProductController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { product_id } = req.body;
    const { _id } = req.user;

    const findProductDB: any = await Product.findById(product_id);

    if (!findProductDB) {
      return res.status(404).json({
        message: messages("NOT_PRODUCT", "", language),
      });
    }

    if (String(findProductDB.author) !== String(_id)) {
      return res.status(403).json({
        message: messages("UNAUTHORIZED", "", language),
      });
    }

    const deletePhoto: boolean = await deleteFile(findProductDB.photo);

    console.log(deletePhoto);

    if (!deletePhoto) {
      return res.status(500).json({
        message: "Error al eliminar las fotos",
      });
    }

    const productDeletedDB = await Product.findByIdAndDelete(product_id);

    return res.status(200).json({
      message: messages("DELETE", `${findProductDB.name}`, language),
      data: productDeletedDB,
    });
  }
);
