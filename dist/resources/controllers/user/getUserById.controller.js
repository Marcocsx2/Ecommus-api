"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.getUserByIdController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "getUserById", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { user_id } = req.body;
    const userFound = yield models_1.User.findById(user_id);
    if (!userFound) {
        res.status(http_status_1.default.NOT_FOUND).json({
            message: dictionary_1.default("WITHOUT_RESULTS", "user", language),
            error: http_status_1.default["404_NAME"],
        });
        return;
    }
    res.status(200).json({
        message: dictionary_1.default("GET", userFound.fullname, language),
        data: userFound,
    });
}));
//# sourceMappingURL=getUserById.controller.js.map