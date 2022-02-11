import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Subcategory } from "../../models";

export const getSubcategoryByCategoryController = catchAsync(
  messages("ERROR_CONTROLLER", "GetSubcategory", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { category } = req.body;

    const SubcategoryDB: any = await Subcategory.find({ category });

    return res.status(201).json({
      message: messages("GET_ALL", "Sub categorias", language),
      subcategories: SubcategoryDB,
    });
  }
);
