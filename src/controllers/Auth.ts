import pino from "pino";
import { Request, Response } from "express";
import AuthService from "../services/Auth";

class AuthController {
  logger;
  service;

  constructor() {
    this.logger = pino();
    this.service = new AuthService();
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const response = await this.service.login(req.body);
      this.logger.info("-- Response --");
      this.logger.info(response);
      res.json(response);
    } catch (error: any) {
      this.logger.error(error);
      res
        .status(error.code || 500)
        .json({ message: error.message || "Error en el servidor" });
    }
  }
}

export default AuthController;
