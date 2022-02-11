import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { uploadOneFile } from "../../../utils/uploadFile";
import { Post } from "../../models";

export const createPostController = catchAsync(
  messages("ERROR_CONTROLLER", "createPost", process.env.NODE_ENV),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const file = req.files.image;

    if (!_id) {
      return res.status(400).json({
        message: messages("USER_UNDEFINED", "", language),
      });
    }

    const responseS3 = await uploadOneFile(file, "posts", _id);

    const newPostDB: any = await Post.create({
      author: _id,
      image: responseS3.Location,
      ...req.body,
    });

    const PostCreated = await Post.findById(newPostDB._id).populate([
      { path: "author", select: "fullname photo" },
      { path: "comments.user", select: "fullname photo" },
    ]);

    return res.status(201).json({
      message: messages("CREATE", PostCreated.title, language),
      post: PostCreated,
    });
  }
);
