import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { User } from "../../models";

export const getUserByIdController = catchAsync(
  messages("ERROR_CONTROLLER", "getUserById", process.env.LAN),
  async (req: Request, res: Response) => {
    const language = req.body.language || process.env.LAN;
    const { user_id } = req.body;

    const userFound: any = await User.findById(user_id);

    if (!userFound) {
      res.status(httpStatus.NOT_FOUND).json({
        message: messages("WITHOUT_RESULTS", "user", language),
        error: httpStatus["404_NAME"],
      });
      return;
    }

    res.status(200).json({
      message: messages("GET", userFound.fullname, language),
      data: userFound,
    });
  }
);
