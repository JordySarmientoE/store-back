import CustomRequest from "../interfaces/CustomRequest";
import { Response } from "express";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";
import { OrderService } from "../services";

class OrderController {
  service;
  constructor() {
    this.service = new OrderService();
  }

  save = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
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
