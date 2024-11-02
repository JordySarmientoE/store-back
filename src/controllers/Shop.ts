import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import pino from "pino";
import { ShopService } from "../services";
import sendError from "../utils/error-helper";

class ShopController {
  logger;
  service;
  constructor() {
    this.logger = pino();
    this.service = new ShopService();
    this.register = this.register.bind(this);
    this.assignShop = this.assignShop.bind(this);
  }

  async register(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const response = await this.service.register(req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async assignShop(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const { userId, shopId } = req.body;
      await this.service.assignShop(userId, shopId);
      res.status(201).json({
        message: "Asignacion exitosa",
      });
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default ShopController;
