"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowedController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
const findFollowed = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const findFollowed = yield models_1.Follower.find({ follower_id: user }).populate([
        { path: "user_id", select: "fullname photo" },
    ]);
    return findFollowed;
});
exports.getFollowedController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "getFollowedController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    let { follower_id } = req.body;
    let followeds = [];
    if (!follower_id) {
        follower_id = _id;
    }
    const getFollowed = yield findFollowed(follower_id);
    getFollowed.forEach((followed) => {
        followeds.push(followed.user_id);
    });
    return res.status(200).json({
        message: dictionary_1.default("FOLLOWING", "", language),
        followed: followeds,
    });
}));
//# sourceMappingURL=getFollowed.controller.js.map