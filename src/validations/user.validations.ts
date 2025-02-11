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

const registerUser = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

const editUser = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(5).required(),
  email: Joi.string().email().optional(),
  phone: Joi.number().required(),
});

export { listUserList, registerUser, editUser };