import { Request, Response } from "express";
import AuthService from "../services/Auth";
import sendError, { keyLogger } from "../utils/error-helper";

class AuthController {
  logger;
  service;

  constructor() {
    this.logger = keyLogger;
    this.service = new AuthService();
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const response = await this.service.login(req.body);

      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default AuthController;
