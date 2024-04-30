import { Response } from "express";
import pino from "pino";

const sendError = (res: Response, error: any) => {
  const logger = pino();
  logger.error(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "Error en el servidor" });
};

export default sendError;
