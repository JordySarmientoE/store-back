import { Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import { CategoryService } from "../services";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";

class CategoryController {
  service;
  constructor() {
    this.service = new CategoryService();
  }

  create = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const user = req.user!;
      const response = await this.service.create(user, req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

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
  }

  findOne = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const categoryId = Number(req.params.id);
      const shopId = Number(req.params.shopId);
      const response = await this.service.findOne(categoryId, shopId);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  update = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const user = req.user!;
      const categoryId = Number(req.params.id);
      const response = await this.service.update(user, categoryId, req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  delete = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
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
