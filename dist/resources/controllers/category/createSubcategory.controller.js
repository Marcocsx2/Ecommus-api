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
exports.createSubcategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dictionary_1 = __importDefault(require("../../../utils/dictionary"));
const models_1 = require("../../models");
exports.createSubcategoryController = catchAsync_1.default(dictionary_1.default("ERROR_CONTROLLER", "CreateCategory", process.env.LAN), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.language || process.env.LAN;
    const { category, name } = req.body;
    const subcategoryExist = yield models_1.Subcategory.findOne({ category, name });
    if (subcategoryExist) {
        return res.status(404).json({
            message: dictionary_1.default("EXIST_SUBCATEGORY", "subcategory", language),
        });
    }
    const newSubcategoryDB = yield models_1.Subcategory.create(Object.assign({}, req.body));
    return res.status(201).json({
        message: dictionary_1.default("CREATE", newSubcategoryDB.name, language),
        subcategory: newSubcategoryDB,
    });
}));
//# sourceMappingURL=createSubcategory.controller.js.map