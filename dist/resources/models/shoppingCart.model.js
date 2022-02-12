"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
let Schema = mongoose_1.default.Schema;
const shoppingCartSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    isEnabled: {
        type: Schema.Types.Boolean,
        required: true,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quantity: {
        type: Schema.Types.Number,
        required: true,
        default: 1,
    },
}, { timestamps: true });
shoppingCartSchema.plugin(mongoose_paginate_v2_1.default);
const ShoppingCart = mongoose_1.model("ShoppingCart", shoppingCartSchema);
exports.default = ShoppingCart;
//# sourceMappingURL=shoppingCart.model.js.map