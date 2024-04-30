import { Request, Response } from "express";
import pino from "pino";
import { UserService } from "../services";
import CustomRequest from "../interfaces/CustomRequest";
import sendError from "../utils/error-helper";

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
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async getInfo(req: CustomRequest, res: Response) {
    res.json(req.user);
  }
}

export default UserController;