"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationEmail = void 0;
const sendMessageEmail_1 = require("./sendMessageEmail");
const sendConfirmationEmail_html_1 = require("./templates/sendConfirmationEmail.html");
exports.sendConfirmationEmail = (email, name, code) => __awaiter(void 0, void 0, void 0, function* () {
    var html_string = sendConfirmationEmail_html_1.html.toString();
    var obj = {
        name: name,
        code: code,
    };
    const algo = Object.keys(obj);
    for (var i = 0; i < algo.length; i++) {
        html_string = html_string.replace("{" + algo[i] + "}", obj[algo[i]]);
    }
    yield sendMessageEmail_1.sendEmail(email, `Hello ${name} welcome to Aluka`, "<h1>Please confirm your Email account</h1>", `${html_string}`);
});
//# sourceMappingURL=sendConfirmationEmail.js.map