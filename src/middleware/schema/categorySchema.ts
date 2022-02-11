import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

export const createCategorySchema = baseSchema({
  body: {
    name: joi.string().required(),
  },
});

// export const createCategorySchema = baseSchema({
//   body: {
//     name: joi.string().required(),
//   },
// });

export const createSubcategorySchema = baseSchema({
  body: {
    category: hexStringSchema.required(),
    name: joi.string().required(),
  },
});

export const getSubcategoryByCategorySchema = baseSchema({
  body: {
    category: hexStringSchema.required()
  },
});