"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReportedProductSchema = exports.giveLikeProductSchema = exports.createReportProductSchema = exports.createReviewSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = exports.getProductBySubcategorySchema = exports.getProductBySearchSchema = exports.getProductByCategorySchema = exports.getProductByUserSchema = exports.getProductByIdSchema = exports.getProductSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const joi_1 = __importDefault(require("joi"));
const hexStringSchema_1 = require("./hexStringSchema");
exports.getProductSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
    },
});
exports.getProductByIdSchema = baseSchema_1.baseSchema({
    body: {
        product_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.getProductByUserSchema = baseSchema_1.baseSchema({
    body: {
        author_id: hexStringSchema_1.hexStringSchema.required(),
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
    },
});
exports.getProductByCategorySchema = baseSchema_1.baseSchema({
    body: {
        category_id: hexStringSchema_1.hexStringSchema.required(),
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
        sort: joi_1.default
            .object({
            filter: joi_1.default.string().trim().required(),
            value: joi_1.default.number().integer().required(),
        })
            .required(),
        where: joi_1.default
            .object({
            field: joi_1.default.string().trim().required(),
            value: joi_1.default.string().trim().required(),
        })
            .required(),
    },
});
exports.getProductBySearchSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
        sort: joi_1.default
            .object({
            filter: joi_1.default.string().trim().required(),
            value: joi_1.default.number().integer().required(),
        })
            .required(),
        where: joi_1.default
            .object({
            field: joi_1.default.string().trim().required(),
            value: joi_1.default.string().trim().required(),
        })
            .required(),
    },
});
exports.getProductBySubcategorySchema = baseSchema_1.baseSchema({
    body: {
        subcategory_id: hexStringSchema_1.hexStringSchema.required(),
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive(),
        sort: joi_1.default
            .object({
            filter: joi_1.default.string().trim().required(),
            value: joi_1.default.number().integer().required(),
        })
            .required(),
    },
});
exports.createProductSchema = baseSchema_1.baseSchema({
    body: {
        name: joi_1.default.string().trim().required(),
        price: joi_1.default.number().positive().precision(2).required(),
        trademark: joi_1.default.string().trim().required(),
        stock: joi_1.default.number().positive().precision(0),
        state: joi_1.default.string(),
        category_id: hexStringSchema_1.hexStringSchema.required(),
        subcategory_id: hexStringSchema_1.hexStringSchema.required(),
        warehouse_id: hexStringSchema_1.hexStringSchema.required(),
        detail: joi_1.default.string().trim(),
        description: joi_1.default.string().trim(),
    },
    files: {
        photo: joi_1.default.object(),
    },
});
exports.updateProductSchema = baseSchema_1.baseSchema({
    body: {
        product_id: hexStringSchema_1.hexStringSchema.required(),
        name: joi_1.default.string().trim(),
        price: joi_1.default.number().positive().precision(2),
        trademark: joi_1.default.string().trim(),
        stock: joi_1.default.number().positive(),
        state: joi_1.default.string(),
        category_id: hexStringSchema_1.hexStringSchema,
        subcategory_id: hexStringSchema_1.hexStringSchema,
        warehouse_id: hexStringSchema_1.hexStringSchema,
        detail: joi_1.default.string().trim(),
        description: joi_1.default.string().trim(),
    },
});
exports.deleteProductSchema = baseSchema_1.baseSchema({
    body: {
        product_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.createReviewSchema = baseSchema_1.baseSchema({
    body: {
        product_id: hexStringSchema_1.hexStringSchema.required(),
        rating: joi_1.default.number().integer().positive().max(5).min(1).required(),
        comment: joi_1.default.string().trim().required(),
    },
});
exports.createReportProductSchema = baseSchema_1.baseSchema({
    body: {
        product: hexStringSchema_1.hexStringSchema.required(),
        description: joi_1.default.string().trim().required(),
    },
});
exports.giveLikeProductSchema = baseSchema_1.baseSchema({
    body: {
        product_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.getReportedProductSchema = baseSchema_1.baseSchema({
    body: {
        page: joi_1.default.number().integer().positive(),
        limit: joi_1.default.number().integer().positive()
    }
});
//# sourceMappingURL=productSchema.js.map