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
exports.addRoomController = void 0;
const models_1 = require("../../models");
exports.addRoomController = (first_user_id, second_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (first_user_id.toString() === second_user_id.toString()) {
        return { ok: false, message: "No puedes iniciar una sala contigo mismo" };
    }
    const existRoom = yield models_1.Chat.findOne({
        first_user_id: first_user_id,
        second_user_id: second_user_id,
    }).populate([
        { path: "first_user_id", select: "fullname photo online" },
        { path: "second_user_id", select: "fullname photo online" },
    ]);
    if (existRoom) {
        return {
            ok: false,
            type: "ROOM_EXIST",
            room: existRoom,
            message: "Ya tienes una sala con este usuario",
        };
    }
    const existRoom2 = yield models_1.Chat.findOne({
        first_user_id: second_user_id,
        second_user_id: first_user_id,
    }).populate([
        { path: "first_user_id", select: "fullname photo online" },
        { path: "second_user_id", select: "fullname photo online" },
    ]);
    if (existRoom2) {
        let room = {
            first_user_id: existRoom2.second_user_id,
            second_user_id: existRoom2.first_user_id,
        };
        return {
            ok: false,
            type: "ROOM_EXIST",
            room: room,
            message: "Ya tienes una sala con este usuario",
        };
    }
    const newRoom = yield models_1.Chat.create({
        first_user_id: first_user_id,
        second_user_id: second_user_id,
    });
    const room = yield models_1.Chat.findOne({
        first_user_id: newRoom.first_user_id,
        second_user_id: newRoom.second_user_id,
    }).populate([
        { path: "first_user_id", select: "fullname photo online" },
        { path: "second_user_id", select: "fullname photo online" },
    ]);
    if (!newRoom) {
        return {
            ok: false,
            message: "No se ah podido crear la sala, intentalo mas tarde",
        };
    }
    return { ok: true, room: room, message: "Sala creado correctamente" };
});
//# sourceMappingURL=addRoom.controller.js.map