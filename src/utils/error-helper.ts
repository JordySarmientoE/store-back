import Logger from "./logger-helper";
import { Response } from "express";

const sendError = (res: Response, error: any) => {
  Logger.error(error);
  if (error.errors) {
    return res.status(400).json({ message: "Error de validación", errors: error.errors });
  }
  return res.status(error.code || 500).json({ message: error.code ? error.message : "Ocurrió un error, inténtelo más tarde." });
};

export default sendError;