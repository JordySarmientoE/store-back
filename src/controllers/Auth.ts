import { Request, Response } from "express";
import AuthService from "../services/Auth";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";

class AuthController {
  service;

  constructor() {
    this.service = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const response = await this.service.login(req.body);

      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default AuthController;
