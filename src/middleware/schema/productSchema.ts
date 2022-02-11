import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

export const getProductSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
  },
});

export const getProductByIdSchema = baseSchema({
  body: {
    product_id: hexStringSchema.required(),
  },
});

export const getProductByUserSchema = baseSchema({
  body: {
    author_id: hexStringSchema.required(),
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
  },
});

export const getProductByCategorySchema = baseSchema({
  body: {
    category_id: hexStringSchema.required(),
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
    sort: joi
      .object({
        filter: joi.string().trim().required(),
        value: joi.number().integer().required(),
      })
      .required(),
    where: joi
      .object({
        field: joi.string().trim().required(),
        value: joi.string().trim().required(),
      })
      .required(),
  },
});

export const getProductBySearchSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
    sort: joi
      .object({
        filter: joi.string().trim().required(),
        value: joi.number().integer().required(),
      })
      .required(),
    where: joi
      .object({
        field: joi.string().trim().required(),
        value: joi.string().trim().required(),
      })
      .required(),
  },
});

export const getProductBySubcategorySchema = baseSchema({
  body: {
    subcategory_id: hexStringSchema.required(),
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
    sort: joi
      .object({
        filter: joi.string().trim().required(),
        value: joi.number().integer().required(),
      })
      .required(),
  },
});

export const createProductSchema = baseSchema({
  body: {
    name: joi.string().trim().required(),
    price: joi.number().positive().precision(2).required(),
    trademark: joi.string().trim().required(),
    stock: joi.number().positive().precision(0),
    state: joi.string(),
    category_id: hexStringSchema.required(),
    subcategory_id: hexStringSchema.required(),
    warehouse_id: hexStringSchema.required(),
    detail: joi.string().trim(),
    description: joi.string().trim(),
  },
  files: {
    photo: joi.object(),
  },
});

export const updateProductSchema = baseSchema({
  body: {
    product_id: hexStringSchema.required(),
    name: joi.string().trim(),
    price: joi.number().positive().precision(2),
    trademark: joi.string().trim(),
    stock: joi.number().positive(),
    state: joi.string(),
    category_id: hexStringSchema,
    subcategory_id: hexStringSchema,
    warehouse_id: hexStringSchema,
    detail: joi.string().trim(),
    description: joi.string().trim(),
  },
  // files: {
  //   photo: joi.object(),
  // },
});

export const deleteProductSchema = baseSchema({
  body: {
    product_id: hexStringSchema.required(),
  },
});

export const createReviewSchema = baseSchema({
  body: {
    product_id: hexStringSchema.required(),
    rating: joi.number().integer().positive().max(5).min(1).required(),
    comment: joi.string().trim().required(),
  },
});

export const createReportProductSchema = baseSchema({
  body: {
    product: hexStringSchema.required(),
    description: joi.string().trim().required(),
  },
});

export const giveLikeProductSchema = baseSchema({
  body: {
    product_id: hexStringSchema.required(),
  },
});

export const getReportedProductSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive()
  }
})
