import { Router } from "express";
import { check } from "express-validator";
import { CategoryController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateVendor } from "../middlewares/validateRole";
import { validateShopId } from "../middlewares/commonValidations";
const router = Router();
const controller = new CategoryController();

router.post(
  "/create",
  [
    validateJWT,
    ValidateVendor,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    ValidateMiddleware,
  ],
  controller.create
);

router.get(
  "/list/shop/:shopId",
  [...validateShopId(), ValidateMiddleware],
  controller.list
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
    check("id", "El id es obligatorio").not().isEmpty().isNumeric(),
    check("categoryId").optional().isNumeric(),
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

export default router;
