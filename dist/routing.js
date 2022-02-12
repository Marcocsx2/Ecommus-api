"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fname_1 = __importDefault(require("./middleware/fname"));
const functions_1 = __importDefault(require("./functions"));
const router = express_1.default();
router.post('/', fname_1.default, functions_1.default);
exports.default = router;
//# sourceMappingURL=routing.js.map