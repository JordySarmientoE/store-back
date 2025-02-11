import Joi from "joi";
import { StatusEnum } from "../interfaces/IUser";

const listShopsSchema = Joi.object({
  rows: Joi.number().required(),
  page: Joi.number().required(),
  name: Joi.string().optional().allow(""),
  address: Joi.string().optional().allow(""),
  ruc: Joi.number().optional().allow(""),
  phone: Joi.number().optional().allow(""),
  email: Joi.string().optional().allow(""),
  status: Joi.string().optional().valid(...Object.values(StatusEnum)),
});

export { listShopsSchema };