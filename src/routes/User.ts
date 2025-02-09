import { Router } from "express";
import { check } from "express-validator";
import { UserController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateAdmin } from "../middlewares/validateRole";
import { StatusEnum } from "../interfaces/IUser";
const router = Router();
const controller = new UserController();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 5 letras").isLength({
      min: 5,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("phone", "El telefono es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El telefono es numerico"),
    ValidateMiddleware,
  ],
  controller.register
);

router.get("/get-info", [validateJWT, ValidateMiddleware], controller.getInfo);

router.get(
  "/list",
  [
    validateJWT,
    check("page", "La pagina es obligataria").not().isEmpty(),
    check("rows", "Las filas es obligatario").not().isEmpty(),
    check("name", "El nombre es opcional").optional(),
    check("lastname", "El apellido es opcional").optional(),
    check("phone", "El telefono es opcional").optional().isNumeric(),
    check("email", "El correo es opcional").optional(),
    check("status", "El status es opcional").optional().isString().isIn(Object.values(StatusEnum)),
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.list
);

router.put(
  "/edit/:userId",
  [
    check("userId", "El shopId es numerico").isNumeric(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 5 letras").isLength({
      min: 5,
    }),
    check("email", "El correo no es válido").isEmail(),
    check("phone", "El telefono es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El telefono es numerico"),
    validateJWT,
    ValidateMiddleware,
  ],
  controller.edit
);

router.delete(
  "/delete/:userId",
  [
    check("userId", "El shopId es numerico").isNumeric(),
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.delete
);

router.put(
  "/enable/:userId",
  [
    check("userId", "El shopId es numerico").isNumeric(),
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.enable
);

export default router;
