import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Follower } from "../../models";

export const addFollowedController = catchAsync(
  messages("ERROR_CONTROLLER", "addFollowedController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    let { user_id, follower_id } = req.body;

    if (!follower_id) {
      follower_id = _id;
    }

    if (user_id === follower_id.toString()) {
      return res
        .status(400)
        .json({ message: messages("CANT_FOLLOW_YOURSELF", "", language) });
    }

    const existedRegister = await Follower.findOne({
      user_id,
      follower_id,
    });

    if (existedRegister) {
      return res
        .status(400)
        .json({ message: messages("ALREADY_FOLLOWED", "", language) });
    }

    const newFollowed = await Follower.create({ user_id, follower_id });

    return res.status(200).json({
      message: messages("FOLLOWING", "", language),
      followed: newFollowed,
    });
  }
);
