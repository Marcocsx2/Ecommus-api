"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowerSchema = exports.getFollowedSchema = exports.addFollowedSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const hexStringSchema_1 = require("./hexStringSchema");
exports.addFollowedSchema = baseSchema_1.baseSchema({
    body: {
        user_id: hexStringSchema_1.hexStringSchema.required(),
        follower_id: hexStringSchema_1.hexStringSchema,
    },
});
exports.getFollowedSchema = baseSchema_1.baseSchema({
    body: {
        follower_id: hexStringSchema_1.hexStringSchema,
    },
});
exports.getFollowerSchema = baseSchema_1.baseSchema({
    body: {
        user_id: hexStringSchema_1.hexStringSchema,
    },
});
//# sourceMappingURL=followerSchema.js.map