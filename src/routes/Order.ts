import { Router } from "express";
import { check } from "express-validator";
import { OrderController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { validateShopId } from "../middlewares/commonValidations";
const router = Router();
const controller = new OrderController();

router.post(
  "/save",
  [
    validateJWT,
    check("order", "El order es obligatorio")
      .not()
      .isEmpty()
      .isArray()
      .withMessage("El order debe ser un arreglo"),
    check("order.*.productId", "El productId es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El product id es un numero"),
    check("order.*.quantity", "La cantidad es obligatoria")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("La cantidad es un numero")
      .isInt({ min: 1 })
      .withMessage("La cantidad debe ser un positivo"),
    ...validateShopId(),
    check("payment", "El método de pago es obligatorio y debe ser válido")
      .not()
      .isEmpty()
      .isIn(["YAPE", "PLIN", "EFECTIVO", "TRANSFERENCIA", "CREDITO"])
      .withMessage(
        "El método de pago debe ser uno de: YAPE, PLIN, EFECTIVO, TRANSFERENCIA, CREDITO"
      ),
    ValidateMiddleware,
  ],
  controller.save
);

export default router;
