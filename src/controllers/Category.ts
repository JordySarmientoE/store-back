import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import pino from "pino";
import { CategoryService } from "../services";
import sendError from "../utils/error-helper";

class CategoryController {
  logger;
  service;
  constructor() {
    this.logger = pino();
    this.service = new CategoryService();
    this.create = this.create.bind(this);
    this.list = this.list.bind(this);
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const user = req.user!;
      const response = await this.service.create(user, req.body);
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

  async findOne(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.params);
      const categoryId = Number(req.params.id);
      const shopId = Number(req.params.shopId);
      const response = await this.service.findOne(categoryId, shopId);
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
      const categoryId = Number(req.params.id);
      const response = await this.service.update(user, categoryId, req.body);
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
      const categoryId = Number(req.params.id);
      const response = await this.service.delete(user, categoryId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default CategoryController;
