import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";
import { basename } from "path";

// Orders
export const createOrderSchema = baseSchema({
  body: {
    order: joi
      .object({
        shipped_date: joi.date().required(),
        shipped_price: joi.number().required(),
        freight: joi.string().required(),
        address_id: hexStringSchema.required(),
        payment_amount: joi.number().required(),
      })
      .required(),
    order_detail: joi
      .array()
      .items(
        joi.object({
          unit_price: joi.number().positive().required(),
          quantity: joi.number().positive().integer().required(),
          discount: joi.number().integer().required(),
          product_id: hexStringSchema.required(),
        })
      )
      .required(),
  },
});

export const getOrderDetailByOrderSchema = baseSchema({
  body: {
    order_id: hexStringSchema.required(),
  },
});

export const getAllOrderSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
  },
});
