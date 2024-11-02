import { Router } from "express";
import { check } from "express-validator";
import { UserController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
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

export default router;
