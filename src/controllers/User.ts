import { Request, Response } from "express";
import { UserService } from "../services";
import CustomRequest from "../interfaces/CustomRequest";
import sendError, { keyLogger } from "../utils/error-helper";

class UserController {
  logger;
  service;

  constructor() {
    this.logger = keyLogger;
    this.service = new UserService();
    this.register = this.register.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.list = this.list.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.enable = this.enable.bind(this);
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
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const { user } = req;
      const response = await this.service.getInfo(user!);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async list(req: CustomRequest, res: Response) {
    try {
      const page = Number(req.query.page);
      const rows = Number(req.query.rows);
      const response = await this.service.list(page, rows);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async delete(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const params = req.params;
      const userId = Number(params.userId);
      await this.service.delete(userId);
      res.json({
        message: "Usuario ha sido eliminado",
      });
    } catch (error) {
      sendError(res, error);
    }
  }

  async edit(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const params = req.params;
      const userId = Number(params.userId);
      const { user } = req;
      const response = await this.service.edit(userId, req.body, user!);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async enable(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const params = req.params;
      const userId = Number(params.userId);
      await this.service.enable(userId);
      res.json({
        message: "Usuario ha sido habilitado",
      });
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default UserController;
