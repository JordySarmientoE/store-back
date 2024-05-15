import { Router } from "express";
import { check } from "express-validator";
import { ProductController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
const router = Router();
const controller = new ProductController();

router.post(
  "/create",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    check("category", "La categoria es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("La categoria debe ser un Mongo Id"),
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
    check("category", "La categoria es opcional")
      .optional()
      .isMongoId()
      .withMessage("La categoria debe ser un Mongo Id"),
    check("quantity", "La cantidad es opcional")
      .optional()
      .isNumeric()
      .withMessage("La cantidad es numerica"),
    check("price", "El precio es opcional")
      .optional()
      .isNumeric()
      .withMessage("El precio es numerico"),
    check("id", "El id es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("El id debe ser un Mongo Id"),
    ValidateMiddleware,
  ],
  controller.update
);

router.delete(
  "/delete/:id",
  [
    validateJWT,
    check("id", "El id es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("El id debe ser un Mongo Id"),
    ValidateMiddleware,
  ],
  controller.delete
);

router.get(
  "/category/:id",
  [
    validateJWT,
    check("id", "La categoria es obligatorio")
      .not()
      .isEmpty()
      .isMongoId()
      .withMessage("La categoria debe ser un Mongo Id"),
    ValidateMiddleware,
  ],
  controller.listByCategory
);

export default router;
