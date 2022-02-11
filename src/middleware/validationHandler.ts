import { Request } from 'express';
import joi from 'joi';
import {baseSchema} from './schema/baseSchema';

const validate = (data: any, schema: any) => {
  const { error } = joi.object(schema).validate(data);
  return error;
};

// Schema: Reglas para validar el request
const validationHandler = (req: Request, schema: any = baseSchema({}), check: string[] = ['body']) => {
  const errors = check.map((toCheck) => {
    const validationError = validate(req[toCheck], schema[toCheck]);    
    if (!validationError) return null;

    return {
      error_type: validationError.name,
      message: validationError.message.replace(/"/g, "'"),
      status_code: 400
    };

  }).filter(Boolean);

  if (errors.length === 0) return null;

  console.log(errors);

  return errors[0];
};

export default validationHandler;