import { verifyRecoverToken } from '../../../services/auth/verifyRecoverToken';
import catchAsync from '../../../utils/catchAsync';
import messages from '../../../utils/dictionary';
import bcrypt from 'bcrypt';
import { User } from '../../models';

export const changePassword = catchAsync(
  messages('ERROR_CONTROLLER', 'changePasswordRecover', process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const token = req.headers.token;
    const { newPassword } = req.body;

    if (!token) {
      return res
        .status(404)
        .json({ message: messages('FIELDS_NEEDED', 'token', language) });
    }

    if (!newPassword) {
      return res
        .status(404)
        .json({ message: messages('FIELDS_NEEDED', 'newPassword', language) });
    }

    const userPayload: any = await verifyRecoverToken(token);

    // return res.status(200).json({ userPayload });

    if (userPayload.err) {
      return res.status(404).json({ message: userPayload.message });
    }

    let newPasswordHash = bcrypt.hashSync(newPassword, 10);

    const userUpdated: any = await User.findByIdAndUpdate(
      { _id: userPayload.id },
      { password: newPasswordHash },
      { new: true }
    );

    return res.status(200).json({
      message: messages('UPDATE', `${userUpdated.fullname}`, language),
      data: userUpdated,
    });
  }
);
