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
exports.addFollowedController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.addFollowedController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "addFollowedController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    let { user_id, follower_id } = req.body;
    if (!follower_id) {
        follower_id = _id;
    }
    if (user_id === follower_id.toString()) {
        return res
            .status(400)
            .json({ message: dictionary_1.default("CANT_FOLLOW_YOURSELF", "", language) });
    }
    const existedRegister = yield models_1.Follower.findOne({
        user_id,
        follower_id,
    });
    if (existedRegister) {
        return res
            .status(400)
            .json({ message: dictionary_1.default("ALREADY_FOLLOWED", "", language) });
    }
    const newFollowed = yield models_1.Follower.create({ user_id, follower_id });
    return res.status(200).json({
        message: dictionary_1.default("FOLLOWING", "", language),
        followed: newFollowed,
    });
}));
//# sourceMappingURL=addFollowed.controller.js.map