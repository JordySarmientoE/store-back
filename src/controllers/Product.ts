import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import { ProductService } from "../services";
import sendError, { keyLogger } from "../utils/error-helper";

class ProductController {
  logger;
  service;
  constructor() {
    this.logger = keyLogger;
    this.service = new ProductService();
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.listByCategory = this.listByCategory.bind(this);
    this.listPaginated = this.listPaginated.bind(this);
  }

  async create(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const user = req.user!;
      const categoryId = req.body.category;
      const response = await this.service.create(user, req.body, categoryId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async list(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const shopId = Number(req.params.shopId);
      const response = await this.service.list(shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async listPaginated(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const user = req.user!;
      const page = Number(req.query.page);
      const rows = Number(req.query.rows);
      const response = await this.service.listPaginated(user, page, rows);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async findOne(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const productId = Number(req.params.id);
      const shopId = Number(req.params.shopId);
      const response = await this.service.findOne(productId, shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async update(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const user = req.user!;
      const productId = Number(req.params.id);
      const response = await this.service.update(user, productId, req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async delete(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const user = req.user!;
      const productId = Number(req.params.id);
      const response = await this.service.delete(user, productId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  async listByCategory(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const shopId = Number(req.params.shopId);
      const categoryId = Number(req.params.id);
      const response = await this.service.listByCategory(categoryId, shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default ProductController;
