import { Chat } from "../../models";

export const sendMessageController = async (
  room_id: string,
  of: string,
  to: string,
  message: string
) => {

  const existRoom = await Chat.findById(room_id);
  if (!existRoom) {
    return { ok: false, type: "ROOM_NOT_EXIST", message: "La sala no existe" };
  }

  const chat = await Chat.findById(room_id);
  chat.messages.push({ room_id, of, to, message })
  await chat.save();

  const newChat = await Chat.findById(room_id).populate([
    { path: "of", select: "fullname photo online" },
    { path: "to", select: "fullname photo online" },
  ]);

  console.log("New chat: ", newChat);

  return newChat;
};
