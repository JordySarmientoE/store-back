import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Error de validación",
      errors: errors.array().map((error) => {
        return {
          message: error.msg,
          path: "path" in error ? [error.path] : [],
          type: error.type,
          location: "location" in error ? error.location : "",
        };
      }),
    });
  }

  next();
};

export default validateFields;
