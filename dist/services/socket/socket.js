"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket = void 0;
const socket_controller_1 = require("../../resources/controllers/chat/socket.controller");
const server_1 = require("../../server");
exports.socket = () => {
    server_1.io.on("connection", socket_controller_1.socketController);
};
//# sourceMappingURL=socket.js.map