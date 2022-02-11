import { newToken, refreshToken } from '../../../services/auth';
import { verifyRefreshToken } from '../../../services/auth/verifyRefreshToken';
import catchAsync from '../../../utils/catchAsync';
import messages from '../../../utils/dictionary';
import { User } from '../../models';
export const refreshTokenController = catchAsync(
  messages('ERROR_CONTROLLER', 'RefreshToken', process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const refreshTkn = req.headers.refreshtoken;
    if (!refreshTkn) {
      return res.status(404).json({
        message: messages('FIELDS_NEEDED', 'refreshToken', language),
      });
    }

    const payload: any = await verifyRefreshToken(refreshTkn);

    const userDB = await User.findById(payload.id);

    const token = newToken(userDB);
    const refToken = refreshToken(userDB);

    return res.status(200).json({
      data: userDB,
      token: token,
      refresh_token: refToken,
    });
  }
);
