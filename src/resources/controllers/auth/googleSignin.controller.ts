import { newToken, refreshToken } from "../../../services/auth";
import { User } from "../../models";
import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";

import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID_WEB);

// Funcion encargada de validar token enviado del cliente
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: [
      process.env.CLIENT_ID_WEB,
      process.env.CLIENT_ID_ANDROID,
      process.env.CLIENT_ID_IOS,
    ],
  });
  const payload = ticket.getPayload();

  return {
    name: payload.name,
    email: payload.email,
    image: payload.picture,
    state: true,
    google: true,
  };
}

export const googleSignin = catchAsync(
  messages("ERROR_CONTROLLER", "GOOGLE_SIGNIN", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { idToken } = req.body;

    console.log(idToken);

    let googleUser = await verify(idToken).catch((err) => {
      return res.status(403).json({
        message: "Error al verificar el id_token",
      });
    });

    const userExistDB: any = await User.findOne({ email: googleUser.email });

    if (userExistDB) {
      if (!userExistDB.google) {
        return res.status(400).json({
          message: messages(
            "EMAIL_WITH_SIMPLE_AUTH",
            userExistDB.email,
            language
          ),
        });
      } else {
        let token = newToken(userExistDB);
        let refreshTkn = refreshToken(userExistDB);
        return res.json({
          message: messages("LOGIN_SUCCESS", userExistDB.fullname, language),
          user: userExistDB,
          token,
          refresh_token: refreshTkn,
        });
      }
    } else {
      let user: any = {
        fullname: googleUser.name,
        email: googleUser.email,
        photo: googleUser.image,
        google: googleUser.google,
        state: googleUser.state,
        password: "google_accout",
      };

      const newUserGoogle: any = await User.create(user);

      let token = newToken(newUserGoogle);
      let refreshTkn = refreshToken(newUserGoogle);

      return res.json({
        message: messages("LOGIN_SUCCESS", newUserGoogle.fullname, language),
        user: newUserGoogle,
        token,
        refresh_token: refreshTkn,
      });
    }
  }
);
