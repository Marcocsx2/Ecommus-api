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
exports.getUsuariosController = exports.getRoomController = void 0;
const models_1 = require("../../models");
exports.getRoomController = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Entre get Room");
    let rooms = [];
    const room_1 = yield models_1.Chat.find({ first_user_id: user_id }).populate([
        { path: "first_user_id", select: "fullname photo online" },
        { path: "second_user_id", select: "fullname photo online" },
    ]);
    const room_2 = yield models_1.Chat.find({ second_user_id: user_id }).populate([
        { path: "first_user_id", select: "fullname photo online" },
        { path: "second_user_id", select: "fullname photo online" },
    ]);
    room_1.forEach((room) => rooms.push({
        _id: room._id,
        first_user_id: room.first_user_id,
        second_user_id: room.second_user_id,
    }));
    room_2.forEach((room) => rooms.push({
        _id: room._id,
        first_user_id: room.second_user_id,
        second_user_id: room.first_user_id,
    }));
    return rooms;
});
exports.getUsuariosController = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield models_1.User.find();
    return usuarios;
});
//# sourceMappingURL=getRoom.controller.js.map