import { baseSchema } from "./baseSchema";
import joi from "joi";
import { hexStringSchema } from "./hexStringSchema";

// Orders
export const estimateDeliverySchema = baseSchema({
  body: {
    data: joi
      .array()
      .items(
        joi
          .object({
            product_id: hexStringSchema.required(),
            address_id: hexStringSchema.required(),
          })
          .required()
      )
      .required(),
  },
});
