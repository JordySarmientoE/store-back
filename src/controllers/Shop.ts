import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import { ShopService } from "../services";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";
import { validateJoi } from "../validations";
import { listShopsSchema } from "../validations/shop.validations";
import { IListShops } from "../interfaces/IShop";

class ShopController {
  service;
  constructor() {
    this.service = new ShopService();
  }

  register = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const response = await this.service.register(req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  assignShop = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const { userId, shopId } = req.body;
      await this.service.assignShop(userId, shopId);
      res.status(201).json({
        message: "Asignacion exitosa",
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  getShop = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const shopId = Number(req.params.shopId);
      const shop = await this.service.getShop(shopId);
      res.status(200).json(shop);
    } catch (error) {
      sendError(res, error);
    }
  };

  list = async (req: CustomRequest, res: Response) => {
    try {
      const payload = req.query as unknown as IListShops;
      validateJoi(req, listShopsSchema);
      const response = await this.service.list(payload);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  delete = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const params = req.params;
      const shopId = Number(params.shopId);
      await this.service.delete(shopId);
      res.json({
        message: "Tienda ha sido eliminada",
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  enable = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const params = req.params;
      const shopId = Number(params.shopId);
      await this.service.enable(shopId);
      res.json({
        message: "Tienda ha sido habilitada",
      });
    } catch (error) {
      sendError(res, error);
    }
  };

  edit = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const params = req.params;
      const shopId = Number(params.shopId);
      const { user } = req;
      const response = await this.service.edit(shopId, req.body, user!);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };
}

export default ShopController;