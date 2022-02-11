import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { uploadOneFile } from "../../../utils/uploadFile";
import { User } from "../../models";

export const updateUserController = catchAsync(
  messages("ERROR_CONTROLLER", "updateUserController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;

    const { user_id } = req.body;
    const existUser = await User.findById(user_id);

    if (!existUser) {
      return res.status(404).json({
        message: messages("ERROR_USER_NOT_FOUND", "", language),
      });
    }

    if (user_id.toString() != _id.toString()) {
      return res.status(403).json({
        message: messages("UNAUTHORIZED", "", language),
      });
    }

    const file = req.files?.photo;

    if (file) {
      const responseS3 = await uploadOneFile(file, "profile", user_id);

      if (!responseS3.Location) {
        return res.status(500).json({
          message:
            "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
        });
      }

      //   const isDelete = await deleteFileToPost(existPost.image);

      //   if (!isDelete) {
      //     return res.status(500).json({
      //       message:
      //         "Upss, parece que no podemos actualizar esta publicación, intentelo mas tarde!",
      //     });
      //   }

      const userUpdated = await User.findByIdAndUpdate(
        user_id,
        { photo: responseS3.Location, ...req.body },
        { new: true }
      );

      return res.status(200).json({
        message: messages("UPDATE", userUpdated.fullname, language),
        user: userUpdated,
      });
    }

    const userUpdated = await User.findByIdAndUpdate(
      user_id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      message: messages("UPDATE", userUpdated.fullname, language),
      user: userUpdated,
    });
  }
);
