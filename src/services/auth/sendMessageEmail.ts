import nodemailer from "nodemailer";
import { google } from "googleapis";
import console from "console";

const CLIENT_ID =
  "592107006941-o6b93povtk4rbne9ohie88pgek9fer70.apps.googleusercontent.com";
const CLIENT_SECRET = "etrzhuqxJadUD96GL22Z2aXi";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04NDnCLQN_pwBCgYIARAAGAQSNwF-L9IrmXZiPqhOdWDi394jHeHcHieIxWuUM4Qc4UjIJHHHNmzC8D5ENV_wvZ0cx-S2LSE7Suw";

export const sendEmail = async (
  email: any,
  subject: string,
  text: string,
  html: any
) => {
  // const OAuth2Client = new google.auth.OAuth2(
  //   CLIENT_ID,
  //   CLIENT_SECRET,
  //   REDIRECT_URL
  // );

  // OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  // const ACCESS_TOKEN = await OAuth2Client.getAccessToken();

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     type: "OAuth2",
  //     user: "alukacompany@gmail.com",
  //     clientId: CLIENT_ID,
  //     clientSecret: CLIENT_SECRET,
  //     refreshToken: REFRESH_TOKEN,
  //     accessToken: ACCESS_TOKEN,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "roberto.huels85@ethereal.email",
      pass: "N95dg9yrhhTGSpGwfE"
    },
  });

  const emailOptions: any = {
    from: `${process.env.ALUKA_EMAIl}`, // sender address
    to: email, // list of receivers
    subject, // Subject line
    text, // plain text body
    html: `${html}`,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log("NODE_EMAILER ERROR: ", err);
      return;
    }
    console.log("info", info);
    return info;
  });
};
