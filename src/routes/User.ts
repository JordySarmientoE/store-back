import { Router } from "express";
import { check } from "express-validator";
import { UserController } from "../controllers";
import { ValidateMiddleware } from "../middlewares";
import validateJWT from "../middlewares/validateJWT";
import { ValidateAdmin } from "../middlewares/validateRole";
const router = Router();
const controller = new UserController();

router.post(
  "/register",
  [],
  controller.register
);

router.get("/get-info", [validateJWT], controller.getInfo);

router.get(
  "/list",
  [
    validateJWT,
    ValidateAdmin,
  ],
  controller.list
);

router.put("/edit/:userId", [validateJWT], controller.edit);

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
