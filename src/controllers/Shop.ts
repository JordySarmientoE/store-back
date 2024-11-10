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
    this.getShops = this.getShops.bind(this);
    this.getShop = this.getShop.bind(this);
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

  async getShops(req: CustomRequest, res: Response) {
    try {
      const shops = await this.service.getShops();
      res.status(200).json(shops);
    } catch (error) {
      sendError(res, error);
    }
  }

  async getShop(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const shopId = Number(req.params.shopId);
      const shop = await this.service.getShop(shopId);
      res.status(200).json(shop);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default ShopController;
