import { Router } from "express";
import { check } from "express-validator";
import { ShopController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateAdmin } from "../middlewares/validateRole";
import { validateShopId } from "../middlewares/commonValidations";
const router = Router();
const controller = new ShopController();

router.post(
  "/create",
  [
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.register
);

router.post(
  "/assign-shop",
  [
    validateJWT,
    ValidateAdmin,
    check("userId", "El userId, nuevo usuario es obligatorio")
      .not()
      .isEmpty()
      .isNumeric(),
    ...validateShopId(),
    ValidateMiddleware,
  ],
  controller.assignShop
);

router.get("/list",controller.list);

router.get(
  "/:shopId",
  [check("shopId", "El shopId es numerico").isNumeric()],
  controller.getShop
);

router.delete(
  "/:shopId",
  [
    check("shopId", "El shopId es numerico").isNumeric(),
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.delete
);

router.put(
  "/enable/:shopId",
  [
    check("shopId", "El shopId es numerico").isNumeric(),
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.enable
);

router.put(
  "/edit/:shopId",
  [
    validateJWT,
    ValidateAdmin,
    ValidateMiddleware,
  ],
  controller.edit
);

export default router;
