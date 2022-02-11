import catchAsync from '../../../utils/catchAsync';
import messages from '../../../utils/dictionary';
import { Product } from '../../models';

export const getProductByUserController = catchAsync(
  messages('ERROR_CONTROLLER', 'GetProductByUserController', process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { author_id, page, limit } = req.body;

    const options = {
      select: ['-__v'],
      populate: [
        { path: 'author', select: 'fullname photo' },
        { path: 'category', select: 'name' },
        { path: 'subcategory', select: 'name' },
        { path: "reviews.user",select: "fullname photo" },
      ],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: 'products', totalDocs: 'totalProducts' },
      sort: { updatedAt: -1 },
    };

    const getProductDB: any = await Product.paginate(
      { author: author_id },
      options
    );

    if (!getProductDB) {
      return res.status(200).json({
        message: messages('WITHOUT_RESULTS', '', language),
        data: [],
      });
    }

    return res.status(200).json({
      message: messages('GET', 'Product', language),
      data: getProductDB,
    });
  }
);
