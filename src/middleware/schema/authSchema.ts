import { baseSchema } from './baseSchema';
import joi from 'joi';

const signupSchema = baseSchema({
  body: {
    name: joi.string().trim(),
    image: joi.string().trim(),
    role: joi.string().trim(),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    state: joi.string().trim(),
    google: joi.boolean(),
  },
});

export { signupSchema };
