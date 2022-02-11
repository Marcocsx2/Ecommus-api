import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";

export const GetUserLoggedController = catchAsync(
  messages("ERROR_CONTROLLER", "GetUserLogged", process.env.LAN),
  async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
  }
);
