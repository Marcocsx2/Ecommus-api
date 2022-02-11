import { newToken, refreshToken } from "../../../services/auth";
import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { SecretCode, User } from "../../models/";

export const validateEmail = catchAsync(
  messages("ERROR_CONTROLLER", "ValidateEmail_Controller", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { code } = req.body;

    const secretCodeDB: any = await SecretCode.findOne({ code });

    if (!secretCodeDB) {
      return res.status(400).json({
        message: messages("ERROR_CODE_VALIDATION", "", language),
      });
    }

    if (secretCodeDB.code !== code) {
      return res.status(400).json({
        message: "Codigos no coinciden",
      });
    }

    const userStateUpdated: any = await User.findByIdAndUpdate(
      secretCodeDB.user_id,
      { state: true },
      { new: true }
    );

    const token = newToken(userStateUpdated);
    const refreshTkn = refreshToken(userStateUpdated);

    return res.status(200).json({
      message: messages("SUCCESS_CODE_VALIDATION", "", language),
      data: userStateUpdated,
      token,
      refresh_token: refreshTkn,
    });
  }
);
