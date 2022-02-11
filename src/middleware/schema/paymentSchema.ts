import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

//
export const createPaymentSchema = baseSchema({
  body: {
    order_id: hexStringSchema.required(),
    payment_data: joi
      .object({
        token: joi.string().required(),
        description: joi.string().required(),
        installments: joi.number().positive().integer().required(),
        payment_method_id: joi.string(),
        issuer_id: joi.string(),
        payer: joi
          .object({
            first_name: joi.string(),
            last_name: joi.string(),
            email: joi.string().required(),
          })
          .required(),
      })
      .required(),
  },
});
