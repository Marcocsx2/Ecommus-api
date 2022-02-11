import { User } from "../../models";

export const userConected = async (user_id: string) => {
  await User.findByIdAndUpdate(user_id, { online: true });
};

export const userDisconnected = async (user_id: string) => {
  await User.findByIdAndUpdate(user_id, { online: false });
};
