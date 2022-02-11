import joi from "joi";
import { baseSchema} from "./baseSchema";
import { hexStringSchema } from "./hexStringSchema";

export const getUsersSchema = baseSchema({
  body: {
    page: joi.number().integer().positive(),
    limit: joi.number().integer().positive(),
  },
});

export const getUserByIdSchema = baseSchema({
  body: {
    user_id: hexStringSchema.required(),
  },
});

export const updateUserSchema = baseSchema({
  body: {
    user_id: hexStringSchema.required(),
    fullname: joi.string().trim(),
  },
});
