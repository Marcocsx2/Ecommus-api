"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWarehouseByIdSchema = exports.updateWarehouseSchema = exports.deleteWarehouseSchema = exports.createWarehouseSchema = void 0;
const baseSchema_1 = require("./baseSchema");
const hexStringSchema_1 = require("./hexStringSchema");
const joi_1 = __importDefault(require("joi"));
const getWarehouseByIdSchema = baseSchema_1.baseSchema({
    body: {
        warehouse_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.getWarehouseByIdSchema = getWarehouseByIdSchema;
const createWarehouseSchema = baseSchema_1.baseSchema({
    body: {
        label: joi_1.default.string().trim().required(),
        lat: joi_1.default.number().required(),
        lon: joi_1.default.number().required(),
        country: joi_1.default.string().required(),
        country_code: joi_1.default.string().max(3).required(),
        city: joi_1.default.string().required(),
        region: joi_1.default.string().required(),
        address: joi_1.default.string().trim().required(),
        main_phone: joi_1.default.string().trim().max(9).required(),
        phone_ext: joi_1.default.string().trim().max(9).default("-"),
        postal_code: joi_1.default.string().required(),
    },
});
exports.createWarehouseSchema = createWarehouseSchema;
const updateWarehouseSchema = baseSchema_1.baseSchema({
    body: {
        warehouse_id: hexStringSchema_1.hexStringSchema.required(),
        label: joi_1.default.string().trim(),
        lat: joi_1.default.number(),
        lon: joi_1.default.number(),
        country: joi_1.default.string(),
        country_code: joi_1.default.string().max(3),
        city: joi_1.default.string(),
        region: joi_1.default.string(),
        address: joi_1.default.string().trim(),
        main_phone: joi_1.default.string().trim().max(9),
        phone_ext: joi_1.default.string().trim().max(9),
        postal_code: joi_1.default.string(),
    },
});
exports.updateWarehouseSchema = updateWarehouseSchema;
const deleteWarehouseSchema = baseSchema_1.baseSchema({
    body: {
        warehouse_id: hexStringSchema_1.hexStringSchema.required(),
    },
});
exports.deleteWarehouseSchema = deleteWarehouseSchema;
//# sourceMappingURL=warehouseSchema.js.map