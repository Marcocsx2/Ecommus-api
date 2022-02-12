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
const mongoose_hidden_1 = __importDefault(require("mongoose-hidden"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let validRoles = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un rol valido",
};
let Schema = mongoose_1.default.Schema;
let userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "El nombre completo es necesario"],
    },
    photo: {
        type: String,
        default: "https://i.stack.imgur.com/l60Hf.png",
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: validRoles,
    },
    email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatorio"],
        hide: true,
    },
    state: {
        type: Boolean,
        default: false,
    },
    google: {
        type: Boolean,
        default: false,
    },
    online: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
userSchema.methods.checkPassword = function (user, password) {
    const passwordHash = user.password;
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err);
            }
            resolve(same);
        });
    });
};
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
userSchema.plugin(mongoose_hidden_1.default);
userSchema.plugin(mongoose_paginate_v2_1.default);
userSchema.plugin(mongoose_unique_validator_1.default, {
    message: "{PATH} debe de ser unico",
});
const User = mongoose_1.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map