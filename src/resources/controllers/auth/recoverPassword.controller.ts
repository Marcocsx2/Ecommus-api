import fs from "fs";
import path from "path";
import { recoverPasswordToken } from "../../../services/auth/recoverPasswordToken";
import { sendEmail } from "../../../services/auth/sendMessageEmail";
import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { User } from "../../models";
import { html } from "../templates/recoverPassword.html";

export const recoverPassword = catchAsync(
  messages("ERROR_CONTROLLER", "recoverPassword", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { email } = req.body;

    const userDB: any = await User.findOne({ email: email });

    if (!userDB) {
      return res.status(404).json({
        message: messages("EMAIL_NOT_MATCHECKED", "email", language),
      });
    }

    if (userDB.google) {
      return res.status(404).json({
        message: messages("EMAIL_SIGNED_GOOGLE", "email-google", language),
      });
    }

    const token = recoverPasswordToken(userDB);

    const recoverPasswordLink = `${process.env.CLIENT_HOST}/auth/recover-password/${token}`;

    console.log("Html ", html);

    var html_string = html.toString();

    console.log("Recover Password Html", html_string);

    var obj = {
      recoverPasswordLink: recoverPasswordLink,
      textPassword: recoverPasswordLink,
      linkOriginal: recoverPasswordLink,
    };

    const algo = Object.keys(obj);

    for (var i = 0; i < algo.length; i++) {
      html_string = html_string.replace("{" + algo[i] + "}", obj[algo[i]]);
    }

    sendEmail(
      userDB.email,
      "Recover Password",
      "Recover Password",
      `${html_string}`
    );

    return res.status(200).json({
      message: messages(
        "EMAIL_TO_CHANGE_PASSWORD_SUCCESS",
        "send email",
        language
      ),
    });
  }
);
