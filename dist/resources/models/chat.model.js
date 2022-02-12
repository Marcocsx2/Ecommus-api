"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const { Types } = mongoose_1.Schema;
const MessageSchema = new mongoose_1.Schema({
    of: {
        type: Types.ObjectId,
        ref: "User",
        unique: false,
    },
    to: {
        type: Types.ObjectId,
        ref: "User",
        unique: false,
    },
    message: {
        type: Types.String,
        unique: false,
    },
}, { timestamps: true });
let ChatSchema = new mongoose_1.Schema({
    first_user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    second_user_id: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    messages: [MessageSchema]
}, { timestamps: true });
ChatSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const Chat = mongoose_1.model("Chat", ChatSchema);
exports.default = Chat;
//# sourceMappingURL=chat.model.js.map