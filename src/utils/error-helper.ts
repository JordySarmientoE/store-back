import Logger from "./logger-helper";
import { Response } from "express";

const sendError = (res: Response, error: any) => {
  Logger.error(error);
  res.status(error.code || 500).json({ message: error.code ? error.message : "Ocurrió un error, inténtelo más tarde." });
};

export default sendError;