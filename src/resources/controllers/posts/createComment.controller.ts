import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Post } from "../../models";

export const createCommentController = catchAsync(
  messages("ERROR_CONTROLLER", "createCommentController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post_id, comment } = req.body;

    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({
        message: messages("POST_NOT_FOUND", "", language),
      });
    }

    const newCommet = { user: _id, comment };

    post.comments.push(newCommet);

    post.totalComments = post.comments.length;

    await post.save();

    const post_commented = await Post.findById(post_id).populate([
      { path: "comments.user", select: "fullname photo" },
      { path: "likes.user", select: "fullname photo" },
      { path: "author", select: "fullname photo" },
    ]);

    return res.status(200).json({
      message: messages("COMMENT_ADDED", "", language),
      post: post_commented,
    });
  }
);
