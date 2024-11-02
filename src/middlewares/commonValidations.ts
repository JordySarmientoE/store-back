import { check } from "express-validator";

export const validateShopId = () => [
  check("shopId", "El shopId es obligatorio").not().isEmpty().isNumeric(),
];