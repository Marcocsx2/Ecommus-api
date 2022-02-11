import { sendEmail } from "./sendMessageEmail";

import { html } from "./templates/sendConfirmationEmail.html";

export const sendConfirmationEmail = async (email, name, code) => {

  var html_string = html.toString();
  var obj = {
    name: name,
    code: code,
  };

  const algo = Object.keys(obj);

  for (var i = 0; i < algo.length; i++) {
    html_string = html_string.replace("{" + algo[i] + "}", obj[algo[i]]);
  }

  await sendEmail(
    email,
    `Hello ${name} welcome to Aluka`,
    "<h1>Please confirm your Email account</h1>",
    `${html_string}`
  );
};
