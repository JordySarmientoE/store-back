import pino from "pino";
import CustomRequest from "../interfaces/CustomRequest";
import { Response } from "express";
import sendError from "../utils/error-helper";
import { OrderService } from "../services";

class OrderController {
  logger;
  service;
  constructor() {
    this.logger = pino();
    this.service = new OrderService();
    this.save = this.save.bind(this);
  }

  async save(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const user = req.user!;
      const order = await this.service.save(user, req.body);
      res.json({
        message: "Orden realizada",
        order,
      });
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default OrderController;
