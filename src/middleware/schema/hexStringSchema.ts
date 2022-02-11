import joi from 'joi';

// hex string (mongodb object id)
const hexStringSchema = joi.string().length(24).hex();

const findByIdSchema = {
  id: hexStringSchema.required()
};

export { hexStringSchema, findByIdSchema };