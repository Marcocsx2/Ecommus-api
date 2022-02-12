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
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
let Schema = mongoose_1.default.Schema;
let secretCodeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        default: true,
        unique: true,
    },
    dateCreated: {
        type: Date,
        default: moment_timezone_1.default(Date.now()).tz("America/Lima").format(),
        index: { expires: 900 },
    },
});
secretCodeSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const SecretCode = mongoose_1.model("Secret_Code", secretCodeSchema);
exports.default = SecretCode;
//# sourceMappingURL=code.model.js.map