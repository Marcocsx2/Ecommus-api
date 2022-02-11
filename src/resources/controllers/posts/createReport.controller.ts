import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Post, ReportPost } from "../../models";

export const createReportController = catchAsync(
  messages("ERROR_CONTROLLER", "createReportController", process.env.NODE_ENV),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post } = req.body;

    const postExist = await Post.findById(post);

    if (!postExist) {
      return res.status(404).json({
        message: messages("POST_NOT_FOUND", "", language),
      });
    }

    const newReportedPost = await ReportPost.create({ user: _id, ...req.body });

    const reportedPost = await ReportPost.findById(
      newReportedPost._id
    ).populate([{ path: "user", select: "fullname photo" }, { path: "post" }]);

    return res.status(201).json({
      message: messages("OK", "", language),
      reported_post: reportedPost,
    });
  }
);
