import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import { ShopService } from "../services";
import sendError, { keyLogger } from "../utils/error-helper";

class ShopController {
  logger;
  service;
  constructor() {
    this.logger = keyLogger;
    this.service = new ShopService();
    this.register = this.register.bind(this);
    this.assignShop = this.assignShop.bind(this);
    this.getShops = this.getShops.bind(this);
    this.getShop = this.getShop.bind(this);
    this.list = this.list.bind(this);
    this.delete = this.delete.bind(this);
    this.enable = this.enable.bind(this);
    this.edit = this.edit.bind(this);
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

  async list(req: CustomRequest, res: Response) {
    try {
      const page = Number(req.query.page || 1);
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
      const shopId = Number(params.shopId);
      await this.service.delete(shopId);
      res.json({
        message: "Tienda ha sido eliminada",
      });
    } catch (error) {
      sendError(res, error);
    }
  }

  async enable(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const params = req.params;
      const shopId = Number(params.shopId);
      await this.service.enable(shopId);
      res.json({
        message: "Tienda ha sido habilitada",
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
      const shopId = Number(params.shopId);
      const { user } = req;
      const response = await this.service.edit(shopId, req.body, user!);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default ShopController;
