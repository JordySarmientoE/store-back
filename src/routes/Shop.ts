import { Router } from "express";
import { check } from "express-validator";
import { ShopController } from "../controllers";
const router = Router();
const controller = new ShopController();

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
  ],
  controller.register
);

export default router;
