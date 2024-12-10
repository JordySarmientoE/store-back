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
    check("email", "El correo no es válido").isEmail(),
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

router.get("/", [], controller.getShops);

router.get(
  "/list",
  [
    validateJWT,
    check("page", "La pagina es obligataria").not().isEmpty(),
    check("rows", "Las filas es obligatario").not().isEmpty(),
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.list
);

router.get(
  "/:shopId",
  [check("shopId", "El shopId es numerico").isNumeric()],
  controller.getShop
);

router.delete(
  "/:shopId",
  [
    check("shopId", "El shopId es numerico").isNumeric(),
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.delete
);

router.put(
  "/enable/:shopId",
  [
    check("shopId", "El shopId es numerico").isNumeric(),
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.enable
);

router.put(
  "/edit/:shopId",
  [
    validateJWT,
    ValidateAdmin,
    check("shopId", "El shopId es numerico").isNumeric(),
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
    check("email", "El correo no es válido").isEmail(),
    ValidateMiddleware,
  ],
  controller.edit
);

export default router;
