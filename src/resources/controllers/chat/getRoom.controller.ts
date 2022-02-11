import { Chat, User } from "../../models";

export const getRoomController = async (user_id: string) => {
  console.log("Entre get Room");

  let rooms = [];

  const room_1 = await Chat.find({ first_user_id: user_id }).populate([
    { path: "first_user_id", select: "fullname photo online" },
    { path: "second_user_id", select: "fullname photo online" },
  ]);

  const room_2 = await Chat.find({ second_user_id: user_id }).populate([
    { path: "first_user_id", select: "fullname photo online" },
    { path: "second_user_id", select: "fullname photo online" },
  ]);

  room_1.forEach((room) =>
    rooms.push({
      _id: room._id,
      first_user_id: room.first_user_id,
      second_user_id: room.second_user_id,
      // messages: room.messages,
    })
  );

  room_2.forEach((room) =>
    rooms.push({
      _id: room._id,
      first_user_id: room.second_user_id,
      second_user_id: room.first_user_id,
      // messages: room.messages,
    })
  );

  return rooms;
};

export const getUsuariosController = async () => {
  const usuarios = await User.find();
  return usuarios;
};
