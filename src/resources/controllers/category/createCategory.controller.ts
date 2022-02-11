import catchAsync from '../../../utils/catchAsync';
import messages from '../../../utils/dictionary';
import { Category } from '../../models';

export const createCategoryController = catchAsync(
  messages('ERROR_CONTROLLER', 'CreateCategory', process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;

    const newCategoryDB: any = await Category.create({ ...req.body });

    return res.status(201).json({
      message: messages('CREATE', newCategoryDB.name, language),
      category: newCategoryDB,
    });
  }
);
