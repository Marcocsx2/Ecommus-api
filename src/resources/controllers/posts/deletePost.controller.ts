import catchAsync from "../../../utils/catchAsync";
import { deleteFileToPost } from "../../../utils/deleteFile";
import messages from "../../../utils/dictionary";
import { Post } from "../../models";

export const deletePostController = catchAsync(
  messages("ERROR_CONTROLLER", "DeletePostController", process.env.NODE_ENV),
  async (req: any, res: any) => {
    const language = req.body.language || process.env.LAN;
    const { post_id } = req.body;

    const existPost = await Post.findById(post_id);

    if (!existPost) {
      return res.status(404).json({
        message: messages("NO_RESOURCES", "", language),
      });
    }

    const isDelete = await deleteFileToPost(existPost.image);

    if (!isDelete) {
      return res.status(500).json({
        message: "No se pudo realizar la eliminación de la imagen",
      });
    }

    const deletedPost = await Post.findByIdAndRemove(post_id, { new: true });

    return res.status(200).json({
      message: messages("DELETE", deletedPost.title, language),
      post: deletedPost,
    }); 
  }
);
