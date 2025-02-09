import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import { ProductService } from "../services";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";

class ProductController {
  service;
  constructor() {
    this.service = new ProductService();
  }

  create = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const user = req.user!;
      const categoryId = req.body.category;
      const response = await this.service.create(user, req.body, categoryId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  list = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const shopId = Number(req.params.shopId);
      const response = await this.service.list(shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  listPaginated = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const user = req.user!;
      const page = Number(req.query.page);
      const rows = Number(req.query.rows);
      const response = await this.service.listPaginated(user, page, rows);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  findOne = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const productId = Number(req.params.id);
      const shopId = Number(req.params.shopId);
      const response = await this.service.findOne(productId, shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  update = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const user = req.user!;
      const productId = Number(req.params.id);
      const response = await this.service.update(user, productId, req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  delete = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const user = req.user!;
      const productId = Number(req.params.id);
      const response = await this.service.delete(user, productId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };

  listByCategory = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const shopId = Number(req.params.shopId);
      const categoryId = Number(req.params.id);
      const response = await this.service.listByCategory(categoryId, shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  };
}

export default ProductController;