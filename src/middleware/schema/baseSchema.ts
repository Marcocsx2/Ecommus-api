import joi from 'joi';

const baseSchema = ({ body, files }: { body?: object; files?: object;}) => {
  return {
    params: {},
    files: {
      ...files,
    },
    body: {
      ...body,
      fname: joi.string().required(),
      service: joi.string(),
      language: joi.string().allow('es', 'en'),
    },
  };

};

export { baseSchema };
