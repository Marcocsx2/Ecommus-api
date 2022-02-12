"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { Types } = mongoose_1.Schema;
let followerSchema = new mongoose_1.Schema({
    user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    follower_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    has_friend: {
        type: Types.Boolean,
        default: false,
        required: true,
    },
}, { timestamps: true });
followerSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const Follower = mongoose_1.model("Follower", followerSchema);
exports.default = Follower;
//# sourceMappingURL=follower.model.js.map