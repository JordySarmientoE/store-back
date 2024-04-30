import { Router } from "express";
import { check } from "express-validator";
import { ShopController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
const router = Router();
const controller = new ShopController();

router.post(
  "/create",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("address", "La direccion es obligatoria").not().isEmpty(),
    check("phone", "El telefono es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El telefono es numerico"),
    ValidateMiddleware,
  ],
  controller.register
);

router.post(
  "/assign-shop",
  [
    validateJWT,
    check("user", "El nuevo usuario es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("El nuevo usuario debe ser un mongo id"),
    ValidateMiddleware,
  ],
  controller.assignShop
);

export default router;
