import { Router } from "express";
import { check } from "express-validator";
import { ProductController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateVendor } from "../middlewares/validateRole";
import { validateShopId } from "../middlewares/commonValidations";
const router = Router();
const controller = new ProductController();

router.post(
  "/create",
  [
    validateJWT,
    ValidateVendor,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    check("category", "La categoria es obligatorio")
      .not()
      .isEmpty()
      .isNumeric(),
    check("quantity", "La cantidad es obligatoria")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("La cantidad es numerica"),
    check("price", "El precio es obligatoria")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El precio es numerico"),
    ValidateMiddleware,
  ],
  controller.create
);

router.get(
  "/list/shop/:shopId",
  [
    ...validateShopId(),
    ValidateMiddleware,
  ],
  controller.list
);

router.get(
  "/list",
  [
    validateJWT,
    ValidateVendor,
    check("page", "La pagina es obligataria").not().isEmpty(),
    check("rows", "Las filas es obligatario").not().isEmpty(),
    ValidateMiddleware,
  ],
  controller.listPaginated
);

router.get(
  "/find/:id/shop/:shopId",
  [
    check("id", "El id es obligatorio").not().isEmpty().isNumeric(),
    ...validateShopId(),
    ValidateMiddleware,
  ],
  controller.findOne
);

router.put(
  "/update/:id",
  [
    validateJWT,
    ValidateVendor,
    check("name", "El nombre es opcional").optional(),
    check("description", "La descripcion es opcional").optional(),
    check("category", "La categoria es opcional").optional().isNumeric(),
    check("quantity", "La cantidad es opcional")
      .optional()
      .isNumeric()
      .withMessage("La cantidad es numerica"),
    check("price", "El precio es opcional")
      .optional()
      .isNumeric()
      .withMessage("El precio es numerico"),
    check("id", "El id es obligatorio").not().isEmpty().isNumeric(),
    ValidateMiddleware,
  ],
  controller.update
);

router.delete(
  "/delete/:id",
  [
    validateJWT,
    ValidateVendor,
    check("id", "El id es obligatorio").not().isEmpty().isNumeric(),
    ValidateMiddleware,
  ],
  controller.delete
);

router.get(
  "/category/:id/shop/:shopId",
  [
    check("id", "La categoria es obligatorio").not().isEmpty().isNumeric(),
    ...validateShopId(),
    ValidateMiddleware,
  ],
  controller.listByCategory
);

export default router;
