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
exports.createReportController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createReportController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "createReportController", process.env.NODE_ENV), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { _id } = req.user;
    const { post } = req.body;
    const postExist = yield models_1.Post.findById(post);
    if (!postExist) {
        return res.status(404).json({
            message: dictionary_1.default("POST_NOT_FOUND", "", language),
        });
    }
    const newReportedPost = yield models_1.ReportPost.create(Object.assign({ user: _id }, req.body));
    const reportedPost = yield models_1.ReportPost.findById(newReportedPost._id).populate([{ path: "user", select: "fullname photo" }, { path: "post" }]);
    return res.status(201).json({
        message: dictionary_1.default("OK", "", language),
        reported_post: reportedPost,
    });
}));
//# sourceMappingURL=createReport.controller.js.map