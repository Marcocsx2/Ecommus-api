import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

export const exampleSchema = baseSchema({
  body: {
    id: hexStringSchema.required(),
    exampleName: joi.number().integer().positive(),
    exampleSuername: joi.number().integer().positive(),
  },
});
