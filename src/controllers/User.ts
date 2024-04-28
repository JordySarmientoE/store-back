import { Request, Response } from "express";
import pino from "pino";
import { UserService } from "../services";
import CustomRequest from "../interfaces/CustomRequest";

class UserController {
  logger;
  service;

  constructor() {
    this.logger = pino();
    this.service = new UserService();
    this.register = this.register.bind(this);
  }

  async register(req: Request, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const response = await this.service.register(req.body);
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

  async getInfo(req: CustomRequest, res: Response) {
    res.json(req.user);
  }
}

export default UserController;
