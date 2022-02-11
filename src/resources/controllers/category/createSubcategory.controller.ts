import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Subcategory } from "../../models";

export const createSubcategoryController = catchAsync(
  messages("ERROR_CONTROLLER", "CreateCategory", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { category, name } = req.body;

    const subcategoryExist: any = await Subcategory.findOne({ category, name });

    if (subcategoryExist) {
      return res.status(404).json({
        message: messages("EXIST_SUBCATEGORY", "subcategory", language),
      });
    }

    const newSubcategoryDB: any = await Subcategory.create({
      ...req.body,
    });

    return res.status(201).json({
      message: messages("CREATE", newSubcategoryDB.name, language),
      subcategory: newSubcategoryDB,
    });
  }
);
