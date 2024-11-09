import { Router } from "express";
import { check } from "express-validator";
import { InventoryMovementController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateVendor } from "../middlewares/validateRole";
const router = Router();
const controller = new InventoryMovementController();

router.post(
  "/move-stock",
  [
    validateJWT,
    ValidateVendor,
    check("productId", "El productId es obligatorio")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("El product id es un numero")
      .isInt({ min: 1 }),
    check("quantity", "La cantidad es obligatoria")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("La cantidad es un numero"),
    ValidateMiddleware,
  ],
  controller.moveInventory
);

export default router;
