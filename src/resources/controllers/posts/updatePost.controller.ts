import catchAsync from "../../../utils/catchAsync";
import { deleteFileToPost } from "../../../utils/deleteFile";
import messages from "../../../utils/dictionary";
import { uploadOneFile } from "../../../utils/uploadFile";
import { Post } from "../../models";

export const updatePostController = catchAsync(
  messages("ERROR_CONTROLLER", "UpdatePostController", process.env.NODE_ENV),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post_id } = req.body;

    const existPost = await Post.findById(post_id);

    if (!existPost) {
      return res.status(404).json({
        message: messages("NO_RESOURCES", "", language),
      });
    }

    const file = req.files?.image;

    if (file) {
      const responseS3 = await uploadOneFile(file, "posts", _id);

      if (!responseS3.Location) {
        return res.status(500).json({
          message:
            "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
        });
      }
      const isDelete = await deleteFileToPost(existPost.image);

      if (!isDelete) {
        return res.status(500).json({
          message:
            "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
        });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        post_id,
        { image: responseS3.Location, ...req.body },
        { new: true }
      );

      return res.status(200).json({
        message: messages("UPDATE", updatedPost.title, language),
        post: updatedPost,
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      post_id,
      { ...req.body },
      { new: true }
    ).populate([
      { path: "author", select: "fullname photo" },
      { path: "comments.user", select: "fullname photo" },
    ]);

    return res.status(200).json({
      message: messages("UPDATE", updatedPost.title, language),
      post: updatedPost,
    });
  }
);
