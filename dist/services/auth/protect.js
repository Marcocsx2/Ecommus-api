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
exports.protect = void 0;
const models_1 = require("../../resources/models");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const _1 = require(".");
const protect = catchAsync_1.default('Error in protect controller', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end('Unauthorized');
    }
    const token = bearer.split('Bearer ')[1].trim();
    let payload;
    payload = yield _1.verifyToken(token);
    const user = yield models_1.User.findById(payload.id)
        .select('-password')
        .lean()
        .exec();
    if (!user) {
        return res.status(401).end('User undefined');
    }
    req.user = user;
    next();
}));
exports.protect = protect;
//# sourceMappingURL=protect.js.map