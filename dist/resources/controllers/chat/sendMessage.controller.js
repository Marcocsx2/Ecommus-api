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
exports.sendMessageController = void 0;
const models_1 = require("../../models");
exports.sendMessageController = (room_id, of, to, message) => __awaiter(void 0, void 0, void 0, function* () {
    const existRoom = yield models_1.Chat.findById(room_id);
    if (!existRoom) {
        return { ok: false, type: "ROOM_NOT_EXIST", message: "La sala no existe" };
    }
    const chat = yield models_1.Chat.findById(room_id);
    chat.messages.push({ room_id, of, to, message });
    yield chat.save();
    const newChat = yield models_1.Chat.findById(room_id).populate([
        { path: "of", select: "fullname photo online" },
        { path: "to", select: "fullname photo online" },
    ]);
    console.log("New chat: ", newChat);
    return newChat;
});
//# sourceMappingURL=sendMessage.controller.js.map