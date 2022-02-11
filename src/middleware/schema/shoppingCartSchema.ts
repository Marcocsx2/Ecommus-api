import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

export const addProductToCartSchema = baseSchema({
  body: {
    product: hexStringSchema.required(),
    isEnabled: joi.boolean(),
    quantity: joi.number().integer().required(),
  },
});

export const deleteProductToCartSchema = baseSchema({
  body: {
    items: joi.array().items(hexStringSchema.required()).required(),
  },
});

export const changeShoppingCartStateSchema = baseSchema({
  body: {
    item_id: hexStringSchema.required(),
  },
});

export const updateShoppingCartSchema = baseSchema({
  body: {
    item_id: hexStringSchema.required(),
    quantity: joi.number().integer(),
  },
});
