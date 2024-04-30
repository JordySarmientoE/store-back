import { Router } from "express";
import { check } from "express-validator";
import { AuthController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
const router = Router();
const controller = new AuthController();

router.post(
  "/login",
  [
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(),
    ValidateMiddleware,
  ],
  controller.login
);

export default router;