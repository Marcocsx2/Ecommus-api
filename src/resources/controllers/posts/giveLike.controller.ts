import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import _ from "underscore";
import { Post } from "../../models";

export const giveLikeController = catchAsync(
  messages("ERROR_CONTROLLER", "giveLikeController", process.env.NODE_ENV),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post_id } = req.body;

    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({
        message: messages("POST_NOT_FOUND", "", language),
      });
    }
    const isLiked = post.likes.find(
      (like: any) => like.user.toString() === _id.toString()
    );

    if (isLiked) {
      const index = _.findLastIndex(post.likes, isLiked);

      post.likes.splice(index, 1);

      post.totalLikes = post.likes.length;

      await post.save();

      const post_liked = await Post.findById(post_id).populate([
        { path: "comments.user", select: "fullname photo" },
        { path: "likes.user", select: "fullname photo" },
        { path: "author", select: "fullname photo" },
      ]);

      return res.status(200).json({
        message: messages("OK", "", language),
        post: post_liked,
      });
    }

    post.likes.push({ user: _id });

    post.totalLikes = post.likes.length;

    await post.save();

    const post_liked = await Post.findById(post_id).populate([
      { path: "comments.user", select: "fullname photo" },
      { path: "likes.user", select: "fullname photo" },
      { path: "author", select: "fullname photo" },
    ]);

    return res.status(200).json({
      message: messages("OK", "", language),
      post: post_liked,
    });
  }
);
