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
exports.suggestionsFriendShipController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
const getRandomsFriends = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    let suggestionsFriendShip = [];
    const count = yield models_1.User.countDocuments();
    let random = Math.floor(Math.random() * count);
    let friendFollowed = yield models_1.User.find().skip(random).limit(10);
    friendFollowed.forEach(friendShip => {
        friendShip = Object.assign(Object.assign({}, friendShip._doc), { random: true });
        suggestionsFriendShip.push(friendShip);
    });
    return suggestionsFriendShip;
});
const getSuggestions = (followed) => __awaiter(void 0, void 0, void 0, function* () {
    let suggestionsFriendShip = [];
    let limit = 2;
    if (followed.length === 0) {
        suggestionsFriendShip = yield getRandomsFriends(6);
    }
    else if (followed.length > 0 && followed.length < 5) {
        limit = 5;
    }
    else if (followed.length > 5 && followed.length < 10) {
        limit = 3;
    }
    else {
        limit = 1;
    }
    for (let i = 0; i < followed.length; i++) {
        const { user_id } = followed[i];
        const friendFollowed = yield models_1.Follower.find({ follower_id: user_id }).limit(limit).populate([
            { path: "user_id", select: "fullname photo" },
            { path: "follower_id", select: "fullname photo" }
        ]);
        console.log(friendFollowed);
        friendFollowed.forEach(friendShip => {
            friendShip = Object.assign(Object.assign({}, friendShip._doc), { random: false });
            console.log(friendShip);
            suggestionsFriendShip.push(friendShip);
        });
    }
    if (suggestionsFriendShip.length < 6) {
        let moreFriends = yield getRandomsFriends(6);
        moreFriends.forEach(friendShip => {
            suggestionsFriendShip.push(friendShip);
        });
    }
    return suggestionsFriendShip;
});
exports.suggestionsFriendShipController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "suggestionsFriendShipController", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const getFollowed = yield models_1.Follower.find({ follower_id: _id });
    const suggestionsFriendShip = yield getSuggestions(getFollowed);
    return res.status(http_status_1.default.OK).json(suggestionsFriendShip);
}));
//# sourceMappingURL=suggestionsFriendShip.controller.js.map