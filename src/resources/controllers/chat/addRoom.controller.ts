import { exists } from "fs";
import { Chat } from "../../models";

export const addRoomController = async (
  first_user_id: string,
  second_user_id: string
) => {
  if (first_user_id.toString() === second_user_id.toString()) {
    return { ok: false, message: "No puedes iniciar una sala contigo mismo" };
  }

  const existRoom = await Chat.findOne({
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

  const existRoom2 = await Chat.findOne({
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

  const newRoom = await Chat.create({
    first_user_id: first_user_id,
    second_user_id: second_user_id,
  });

  const room = await Chat.findOne({
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
};
