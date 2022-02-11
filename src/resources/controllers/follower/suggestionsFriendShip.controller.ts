import { Response } from "express";
import httpStatus from "http-status";
import { suggestionsFriendShip } from "..";
import catchAsync from "../../../utils/catchAsync";
import messages from "../../../utils/dictionary";
import { Follower, User } from "../../models";

const getRandomsFriends = async (limit: number) => {
    let suggestionsFriendShip = [];
    const count = await User.countDocuments()
    let random = Math.floor(Math.random() * count);
    let friendFollowed = await User.find().skip(random).limit(10);

    friendFollowed.forEach(friendShip => {
        friendShip = { ...friendShip._doc, random: true }
        suggestionsFriendShip.push(friendShip);
    })

    return suggestionsFriendShip;
}

const getSuggestions = async (followed: any) => {

    let suggestionsFriendShip = [];
    let limit = 2;

    if (followed.length === 0) {

        suggestionsFriendShip = await getRandomsFriends(6);

    } else if (followed.length > 0 && followed.length < 5) {
        limit = 5
    } else if (followed.length > 5 && followed.length < 10) {
        limit = 3
    } else {
        limit = 1
    }

    for (let i = 0; i < followed.length; i++) {
        const { user_id } = followed[i];
        const friendFollowed = await Follower.find({ follower_id: user_id }).limit(limit).populate([
            { path: "user_id", select: "fullname photo" },
            { path: "follower_id", select: "fullname photo" }
        ]);

        console.log(friendFollowed);


        friendFollowed.forEach(friendShip => {
            friendShip = { ...friendShip._doc, random: false }
            console.log(friendShip);
            suggestionsFriendShip.push(friendShip);
        })

    }


    if (suggestionsFriendShip.length < 6) {
        let moreFriends = await getRandomsFriends(6);
        moreFriends.forEach(friendShip =>{
            suggestionsFriendShip.push(friendShip);
        })
    }

    return suggestionsFriendShip;

}


export const suggestionsFriendShipController = catchAsync(
    messages(
        "ERROR_CONTROLLER",
        "suggestionsFriendShipController",
        process.env.LAN
    ),
    async (req: any, res: Response) => {

        const language = req.body.language || process.env.LAN;
        const { _id } = req.user;

        const getFollowed = await Follower.find({ follower_id: _id })

        const suggestionsFriendShip = await getSuggestions(getFollowed);

        return res.status(httpStatus.OK).json(suggestionsFriendShip);

    }
);
