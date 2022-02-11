import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Follower } from "../../models";

const getFollower = async (user: string) => {
  const findFollower = await Follower.find({ user_id: user }).populate([
    { path: "follower_id", select: "fullname photo" },
  ]);

  return findFollower;
};

export const getFollowerController = catchAsync(
  messages("ERROR_CONTROLLER", "getFollowerController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    let { user_id } = req.body;
    let followers = [];

    if (!user_id) {
      user_id = _id;
    }

    const getFollowers = await getFollower(user_id);

    getFollowers.forEach((follower: any) => {
      followers.push(follower.follower_id);
    });

    return res.status(200).json({
      message: messages("FOLLOWING", "", language),
      followers,
    });
  }
);
