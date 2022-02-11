import { baseSchema } from "./baseSchema";
import { hexStringSchema } from "./hexStringSchema";
import joi from "joi";

const getWarehouseByIdSchema = baseSchema({
  body: {
    warehouse_id: hexStringSchema.required(),
  },
});

const createWarehouseSchema = baseSchema({
  body: {
    label: joi.string().trim().required(),
    lat: joi.number().required(),
    lon: joi.number().required(),
    country: joi.string().required(),
    country_code: joi.string().max(3).required(),
    city: joi.string().required(),
    region: joi.string().required(),
    address: joi.string().trim().required(),
    main_phone: joi.string().trim().max(9).required(),
    phone_ext: joi.string().trim().max(9).default("-"),
    postal_code: joi.string().required(),
  },
});

const updateWarehouseSchema = baseSchema({
  body: {
    warehouse_id: hexStringSchema.required(),
    label: joi.string().trim(),
    lat: joi.number(),
    lon: joi.number(),
    country: joi.string(),
    country_code: joi.string().max(3),
    city: joi.string(),
    region: joi.string(),
    address: joi.string().trim(),
    main_phone: joi.string().trim().max(9),
    phone_ext: joi.string().trim().max(9),
    postal_code: joi.string(),
  },
});

const deleteWarehouseSchema = baseSchema({
  body: {
    warehouse_id: hexStringSchema.required(),
  },
});

export {
  createWarehouseSchema,
  deleteWarehouseSchema,
  updateWarehouseSchema,
  getWarehouseByIdSchema,
};
