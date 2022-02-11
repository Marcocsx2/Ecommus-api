import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Follower } from "../../models";

const findFollowed = async (user: string) => {
  const findFollowed = await Follower.find({ follower_id: user }).populate([
    { path: "user_id", select: "fullname photo" },
  ]);

  return findFollowed;
};

export const getFollowedController = catchAsync(
  messages("ERROR_CONTROLLER", "getFollowedController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    let { follower_id } = req.body;
    let followeds = [];

    if (!follower_id) {
      follower_id = _id;
    }

    const getFollowed = await findFollowed(follower_id);

    getFollowed.forEach((followed: any) => {
      followeds.push(followed.user_id);
    });

    return res.status(200).json({
      message: messages("FOLLOWING", "", language),
      followed: followeds,
    });
  }
);
