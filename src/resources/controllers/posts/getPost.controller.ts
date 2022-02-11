import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Post } from "../../models";

export const getPostController = catchAsync(
  messages("ERROR_CONTROLLER", "getPost", process.env.LAN),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { page, limit } = req.body;

    const options = {
      select: ["-__v"],
      populate: [
        { path: "author", select: "fullname photo" },
        { path: "comments.user", select: "fullname photo" },
        { path: "likes.user", select: "fullname photo" },
      ],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: "posts", totalPages: "totalPosts" },
      sort: { updatedAt: -1 },
    };

    const getPostDB: any = await Post.paginate({}, options);

    return res.status(200).json({
      message: messages("GET_ALL", "Posts", language),
      data: getPostDB,
    });
  }
);
