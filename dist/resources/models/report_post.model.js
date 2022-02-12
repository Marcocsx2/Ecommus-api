"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Types } = mongoose_1.Schema;
let ReportPostSchema = new mongoose_1.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    post: {
        type: Types.ObjectId,
        ref: "Post",
        required: true,
        unique: false,
    },
    description: {
        type: String,
        requiered: true,
    },
    status: {
        type: Boolean,
        requiered: true,
        default: false,
    },
}, { timestamps: true });
ReportPostSchema.plugin(mongoose_paginate_v2_1.default);
ReportPostSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const ReportPost = mongoose_1.model("ReportPost", ReportPostSchema);
exports.default = ReportPost;
//# sourceMappingURL=report_post.model.js.map