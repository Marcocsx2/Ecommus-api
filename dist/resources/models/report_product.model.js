"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Types } = mongoose_1.Schema;
let ReportProductSchema = new mongoose_1.Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    product: {
        type: Types.ObjectId,
        ref: "Product",
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
ReportProductSchema.plugin(mongoose_paginate_v2_1.default);
ReportProductSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const ReportProduct = mongoose_1.model("ReportProduct", ReportProductSchema);
exports.default = ReportProduct;
//# sourceMappingURL=report_product.model.js.map