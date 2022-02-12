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
exports.getFollowerController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
const getFollower = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const findFollower = yield models_1.Follower.find({ user_id: user }).populate([
        { path: "follower_id", select: "fullname photo" },
    ]);
    return findFollower;
});
exports.getFollowerController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "getFollowerController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    let { user_id } = req.body;
    let followers = [];
    if (!user_id) {
        user_id = _id;
    }
    const getFollowers = yield getFollower(user_id);
    getFollowers.forEach((follower) => {
        followers.push(follower.follower_id);
    });
    return res.status(200).json({
        message: dictionary_1.default("FOLLOWING", "", language),
        followers,
    });
}));
//# sourceMappingURL=getFollower.controller.js.map