import messages from "../../../utils/dictionary";
import { User, SecretCode } from "../../models";
import bcrypt from "bcrypt";
import catchAsync from "../../../utils/catchAsync";
import { sendConfirmationEmail } from "../../../services/auth/sendConfirmationEmail";

import cryptoRandomString from "crypto-random-string";
import moment from "moment";

export const signup = catchAsync(
  messages("ERROR_CONTROLLER", "signup", process.env.LAN),
  async (req, res) => {
    const code = cryptoRandomString({ length: 6, type: "numeric" });

    const language = req.body.language || process.env.LAN;
    const { fullname, email, password } = req.body;

    let passwordHashed = bcrypt.hashSync(password, 10);

    const dataUser: any = {
      fullname,
      email,
      password: passwordHashed,
    };

    //COMMENT: Cuando el usuario esta verificado en la aplicacion

    const emailWithStateTrueExist: any = await User.findOne({
      email,
      state: true,
    });

    if (emailWithStateTrueExist) {
      return res.status(400).json({
        message: messages(
          "EMAIL_EXIST",
          emailWithStateTrueExist.email,
          language
        ),
      });
    }

    //COMMENT: Cuando el usuario esta en la plataforma pero no esta verificado

    const emailWithStateFalseExist: any = await User.findOne({
      email,
      state: false,
    });

    if (emailWithStateFalseExist) {
      const userUpdated: any = await User.findByIdAndUpdate(
        emailWithStateFalseExist._id,
        dataUser
      );

      await sendConfirmationEmail(
        userUpdated.email,
        userUpdated.fullname,
        code
      );

      //COMMENT: Actualizamos el codigo si en caso exista

      const updateCode = await SecretCode.findOneAndUpdate(
        { user_id: userUpdated._id },
        { code, dateCreated: moment(Date.now()).tz("America/Lima").format() }
      );

      //COMMENT: Generamos un nuevo codigo en caso que no exista ninguno

      if (!updateCode) {
        await SecretCode.create({ user_id: userUpdated._id, code });
      }

      return res.json({
        message: messages("CREATE", userUpdated.fullname, language),
        validation: "Por favor confirme la dirección de su correo electrónico",
      });
    }

    //COMMENT: Si el usuario aun no esta registrado ni verificado (Nuevo usuario)

    const newUserDB: any = await User.create(dataUser);

    await sendConfirmationEmail(newUserDB.email, newUserDB.fullname, code);

    await SecretCode.create({
      user_id: newUserDB._id,
      code,
    });

    return res.json({
      message: messages("CREATE", newUserDB.fullname, language),
      validation: "Por favor confirme la dirección de su correo electrónico",
    });
  }
);
