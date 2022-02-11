import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Follower, Post } from "../../models";

const getPost = async (followeds: any) => {
  var posts = [];

  for (let i = 0; i < followeds.length; i++) {
    const { user_id } = followeds[i];
    const findPost = await Post.find({ author: user_id }).populate([
      { path: "author", select: "fullname photo" },
      { path: "comments.user", select: "fullname photo" },
      { path: "likes.user", select: "fullname photo" },
    ]);

    for (let i = 0; i < findPost.length; i++) {
      posts.push(findPost[i]);
    }
  }

  return posts;
};

export const getPostByFollowedController = catchAsync(
  messages("ERROR_CONTROLLER", "getPostByFollowedController", process.env.LAN),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const getFollowed = await Follower.find({ follower_id: _id });

    const posts = await getPost(getFollowed);

    return res.status(200).json({
      message: messages("GET_ALL", "Posts", language),
      data: posts,
    });
  }
);
