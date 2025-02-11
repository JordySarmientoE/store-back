import Joi from "joi";
import { RoleEnum, StatusEnum } from "../interfaces/IUser";

const listUserListSchema = Joi.object({
  rows: Joi.number().required(),
  page: Joi.number().required(),
  name: Joi.string().optional().allow(""),
  lastname: Joi.string().optional().allow(""),
  phone: Joi.number().optional().allow(""),
  email: Joi.string().optional().allow(""),
  status: Joi.string().optional().valid(...Object.values(StatusEnum)),
  role: Joi.string().optional().allow("").valid(...Object.values(RoleEnum)),
});

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required().min(9).max(9),
});

const editUserSchema = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(5).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().required().min(9).max(9),
});

export { listUserListSchema, registerUserSchema, editUserSchema };