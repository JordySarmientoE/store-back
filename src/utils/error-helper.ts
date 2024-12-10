import { Response } from "express";
import pino from "pino";

export const keyLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
});

const sendError = (res: Response, error: any) => {
  keyLogger.error(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "Error en el servidor" });
};

export default sendError;
