"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
let WarehouseSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    label: {
        type: String,
        unique: false,
        required: true,
    },
    lat: {
        type: Number,
        unique: false,
        required: true,
    },
    lon: {
        type: Number,
        unique: false,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    country_code: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        unique: false,
        required: true,
    },
    main_phone: {
        type: String,
        unique: false,
        required: true,
    },
    phone_ext: {
        type: String,
        unique: false,
        required: false,
    },
    postal_code: {
        type: String,
        unique: false,
        required: true,
    }
});
WarehouseSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const Warehouse = mongoose_1.model("Warehouse", WarehouseSchema);
exports.default = Warehouse;
//# sourceMappingURL=warehouse.model.js.map