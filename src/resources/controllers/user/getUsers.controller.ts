import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { User } from "../../models";

export const getUsersController = catchAsync(
  messages("ERROR_CONTROLLER", "getUsersController", process.env.LAN),
  async (req, res) => {
    const language = req.body.language || process.env.LAN;
    const { page, limit } = req.body;

    const options = {
      select: ["-__v", "-password"],
      populate: [],
      page: page || 1,
      limit: limit || 10,
      lean: true,
      customLabels: { docs: "users", totalDocs: "totalUsers" },
      sort: { updatedAt: -1 },
    };

    const users = await User.paginate({}, options);

    return res.status(200).json({
      message: messages("GET_ALL", "User", language),
      users,
    });
  }
);
