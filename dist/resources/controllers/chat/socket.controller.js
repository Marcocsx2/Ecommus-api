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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const console_1 = __importDefault(require("console"));
const auth_1 = require("../../../services/auth");
const models_1 = require("../../models");
const addRoom_controller_1 = require("./addRoom.controller");
const getRoom_controller_1 = require("./getRoom.controller");
const sendMessage_controller_1 = require("./sendMessage.controller");
const userState_controller_1 = require("./userState.controller");
const server_1 = require("../../../server");
exports.socketController = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const token = socket.handshake.query["x-token"];
    try {
        console_1.default.log("TOKEN:", token);
        const payload = yield auth_1.verifyToken(token);
        if (!payload) {
            console_1.default.log("USUARIO DESCONECTADO");
            return socket.disconnect();
        }
        const usuario = yield models_1.User.findById(payload.id);
        yield userState_controller_1.userConected(usuario._id);
        console_1.default.log("Se conecto el usuario", usuario.fullname);
        server_1.io.emit("getRooms", yield getRoom_controller_1.getRoomController(usuario._id));
        socket.on("addRoom", ({ second_user_id }) => __awaiter(void 0, void 0, void 0, function* () {
            socket.emit("notification", yield addRoom_controller_1.addRoomController(usuario._id, second_user_id));
            socket.emit("getRooms", yield getRoom_controller_1.getRoomController(usuario._id));
        }));
        socket.on("getRoomAndSendMessage", ({ room_id, of, to, message }) => __awaiter(void 0, void 0, void 0, function* () {
            socket.emit("sendMessage", yield sendMessage_controller_1.sendMessageController(room_id, of, to, message));
        }));
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            console_1.default.log("Usuario desconectado" + usuario.fullname);
            yield userState_controller_1.userDisconnected(usuario._id);
            server_1.io.emit("getRooms", yield getRoom_controller_1.getUsuariosController());
        }));
    }
    catch (error) {
        console_1.default.log("ERROR:", error);
        console_1.default.log("usuario desconectado");
        return socket.disconnect();
    }
});
//# sourceMappingURL=socket.controller.js.map