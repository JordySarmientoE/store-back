import { Request } from "express";
import Joi from "joi";

const validateJoi = (req: Request, schema: Joi.ObjectSchema<any>) => {
  const body = req.body;
  const params = req.params;
  const query = req.query;

  const payload = {
    ...query,
    ...params,
    ...body,
  };

  const { error } = schema.validate(payload);
  if (error) {
    throw {
      errors: error.details.map((error) => {
        return {
          message: error.message,
          path: error.path,
          type: error.type,
        };
      }),
    };
  }
};

export default validateJoi;