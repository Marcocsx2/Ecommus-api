import { socketController } from "../../resources/controllers/chat/socket.controller";
import { io } from "../../server";

export const socket = () => {
  io.on("connection", socketController);
};
