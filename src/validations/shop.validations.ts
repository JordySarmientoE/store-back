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

const createShopSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  ruc: Joi.string().optional().min(11).max(11).allow(""),
  phone: Joi.number().optional().allow("").min(9).max(9),
  email: Joi.string().email().optional().allow(""),
});

const editShopSchema = Joi.object({
  name: Joi.string().optional().allow(""),
  address: Joi.string().required(),
  ruc: Joi.string().optional().allow("").min(11).max(11),
  phone: Joi.string().optional().allow(""),
  email: Joi.string().email().optional().allow("").min(9).max(9),
  shopId: Joi.number().required(),
});

export { listShopsSchema, createShopSchema, editShopSchema };