import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

export const createPostSchema = baseSchema({
  body: {
    title: joi.string().required(),
    description: joi.string().required(),
  },
  files: {
    image: joi.object().required(),
  },
});

export const updatePostSchema = baseSchema({
  body: {
    post_id: hexStringSchema.required(),
    title: joi.string(),
    description: joi.string(),
  },
  files: {
    image: joi.object(),
  },
});

export const deletePostSchema = baseSchema({
  body: {
    post_id: hexStringSchema.required(),
  },
});

export const getPostSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
  },
});

export const getPostByUserSchema = baseSchema({
  body: {
    author_id: hexStringSchema.required(),
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
  },
});

export const createCommentSchema = baseSchema({
  body: {
    post_id: hexStringSchema.required(),
    comment: joi.string().trim().required(),
  },
});

export const giveLikeSchema = baseSchema({
  body: {
    post_id: hexStringSchema.required(),
  },
});

export const createReportPostSchema = baseSchema({
  body: {
    post: hexStringSchema.required(),
    description: joi.string().trim().required(),
  },
});

export const getReportedPostSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive()
  }
})