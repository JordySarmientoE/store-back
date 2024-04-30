import { Router } from "express";
import { check } from "express-validator";
import { CategoryController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
const router = Router();
const controller = new CategoryController();

router.post(
  "/create",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    ValidateMiddleware,
  ],
  controller.create
);

router.get("/list", [validateJWT], controller.list);

router.get(
  "/find/:id",
  [
    validateJWT,
    check("id", "El id es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("El id debe ser un Mongo Id"),
    ValidateMiddleware,
  ],
  controller.findOne
);

router.put(
  "/update/:id",
  [
    validateJWT,
    check("name", "El nombre es opcional").optional(),
    check("description", "La descripcion es opcional").optional(),
    check("id", "El id es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("El id debe ser un Mongo Id"),
    ValidateMiddleware,
  ],
  controller.update
);

export default router;
