import catchAsync from '../../../utils/catchAsync';
import messages from '../../../utils/dictionary';
import { Category } from '../../models';

export const getCategoryController = catchAsync(
  messages('ERROR_CONTROLLER', 'GetCategory', process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;

    const CategoryDB: any = await Category.find({});

    return res.status(201).json({
      message: messages('GET_ALL', 'Categorias', language),
      categories: CategoryDB,
    });
  }
);
