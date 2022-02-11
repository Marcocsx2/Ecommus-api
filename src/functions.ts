import validationHandler from './middleware/validationHandler';
import * as controller from './resources/controllers';

const fn = async (req, res, next) => {
  let fname = controller[req.fname];

  if (!fname) {
    return res.status(500).json({ message: 'fname no existe' });
  }

  const validationErrorResponse = validationHandler(
    req,
    fname.schema,
    fname.check
  );

  if (validationErrorResponse) {
    return res.status(400).json(validationErrorResponse);
  }

  return fname.controller(req, res, next);
};

export default fn;
