import console from "console";
import { Socket } from "socket.io";
import { verifyToken } from "../../../services/auth";
import { User } from "../../models";
import { addRoomController } from "./addRoom.controller";
import { getRoomController, getUsuariosController } from "./getRoom.controller";
import { sendMessageController } from "./sendMessage.controller";
import { userConected, userDisconnected } from "./userState.controller";
import { io } from "../../../server";

export const socketController = async (socket: Socket) => {
  const token = socket.handshake.query["x-token"];

  try {
    console.log("TOKEN:", token);


    // Validar si el token es Valido
    const payload: any = await verifyToken(token);

    if (!payload) {
      console.log("USUARIO DESCONECTADO");
      return socket.disconnect();
    }

    // Obtener usuario en Sesion
    const usuario = await User.findById(payload.id);
    await userConected(usuario._id);
    console.log("Se conecto el usuario", usuario.fullname);

    // Enviar las salas del usuario en sesion
    io.emit("getRooms", await getRoomController(usuario._id));
    // io.emit("getRooms", await getUsuariosController());

    // Recibir una nueva sala para el usuario Y enviar las salas actualizadas del Usuario
    socket.on("addRoom", async ({ second_user_id }: any) => {
      socket.emit(
        "notification",
        await addRoomController(usuario._id, second_user_id)
      );

      socket.emit("getRooms", await getRoomController(usuario._id));
    });

    // Obtener 

    // Enviar un nuevo mensaje
    socket.on(
      "getRoomAndSendMessage",
      async ({ room_id, of, to, message }: any) => {
        socket.emit(
          "sendMessage",
          await sendMessageController(room_id, of, to, message)
        );
      }
    );

    // Desconectar al Usuario cuando cierra la conexion
    socket.on("disconnect", async () => {
      console.log("Usuario desconectado" + usuario.fullname);
      await userDisconnected(usuario._id)
      // io.emit("getRooms", await getRoomController(usuario._id));
      io.emit("getRooms", await getUsuariosController());
    });
  } catch (error) {
    // Desconectar al Usuario en caso no exista el token o Suceda algun otro error
    console.log("ERROR:", error);

    console.log("usuario desconectado");
    return socket.disconnect();
  }
};
