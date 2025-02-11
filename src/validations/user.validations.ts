import Joi from "joi";
import { RoleEnum, StatusEnum } from "../interfaces/IUser";

const listUserList = Joi.object({
  rows: Joi.number().required(),
  page: Joi.number().required(),
  name: Joi.string().optional().allow(""),
  lastname: Joi.string().optional().allow(""),
  phone: Joi.number().optional().allow(""),
  email: Joi.string().optional().allow(""),
  status: Joi.string().optional().valid(...Object.values(StatusEnum)),
  role: Joi.string().optional().allow("").valid(...Object.values(RoleEnum)),
});

export { listUserList };