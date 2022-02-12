"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Types } = mongoose_1.Schema;
const MessageSchema = new mongoose_1.Schema({
    room_id: {
        type: Types.ObjectId,
        ref: "Chat",
        required: true,
    },
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
const Message = mongoose_1.model("Message", MessageSchema);
exports.default = Message;
//# sourceMappingURL=message.model.js.map