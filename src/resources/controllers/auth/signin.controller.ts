import { newToken, refreshToken } from '../../../services/auth';
import { User } from '../../models';
import catchAsync from '../../../utils/catchAsync';
import messages from '../../../utils/dictionary';

export const signin = catchAsync(
  messages('ERROR_CONTROLLER', 'Signin', process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'need email and password' });
    }

    const userDB: any = await User.findOne({ email }).exec();

    if (!userDB) {
      return res.status(401).json({
        message: messages('EMAIL_INCORRECT', 'signin', language),
      });
    }

    if (!userDB.state) {
      return res.status(401).json({
        message: messages('CHECK_EMAIL', '', language),
      });
    }

    const match = await userDB.schema.methods.checkPassword(userDB, password);

    if (!match) {
      return res.status(401).json({
        message: messages('PASSWORD_INCORRECT', 'signin', language),
      });
    }
    const token = newToken(userDB);
    const refresh_token = refreshToken(userDB);

    return res.status(200).json({
      message: messages('LOGIN_SUCCESS', userDB.fullname, language),
      data: userDB,
      token,
      refresh_token,
    });
  }
);
