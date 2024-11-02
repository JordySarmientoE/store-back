import { Router } from "express";
import { check } from "express-validator";
import { ShopController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateAdmin } from "../middlewares/validateRole";
import { validateShopId } from "../middlewares/commonValidations";
const router = Router();
const controller = new ShopController();

router.post(
  "/create",
  [
    validateJWT,
    ValidateAdmin,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("address", "La direccion es obligatoria").not().isEmpty(),
    check("phone", "El telefono es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El telefono es numerico"),
    check("ruc", "El ruc es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El ruc es numerico")
      .isLength({ max: 11, min: 11 })
      .withMessage("El ruc debe tener 11 digitos"),
    ValidateMiddleware,
  ],
  controller.register
);

router.post(
  "/assign-shop",
  [
    validateJWT,
    ValidateAdmin,
    check("userId", "El userId, nuevo usuario es obligatorio")
      .not()
      .isEmpty()
      .isNumeric(),
    ...validateShopId(),
    ValidateMiddleware,
  ],
  controller.assignShop
);

export default router;
