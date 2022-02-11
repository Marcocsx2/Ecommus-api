import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

export const addFollowedSchema = baseSchema({
  body: {
    user_id: hexStringSchema.required(),
    follower_id: hexStringSchema,
  },
});

export const getFollowedSchema = baseSchema({
  body: {
    follower_id: hexStringSchema,
  },
});

export const getFollowerSchema = baseSchema({
  body: {
    user_id: hexStringSchema,
  },
});
