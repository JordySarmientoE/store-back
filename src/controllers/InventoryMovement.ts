import CustomRequest from "../interfaces/CustomRequest";
import { Response } from "express";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";
import { InventoryMovementService } from "../services";

class InventoryMovementController {
  service;
  constructor() {
    this.service = new InventoryMovementService();
  }

  moveInventory = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const user = req.user!;
      await this.service.moveInventory(user, req.body);
      res.json({
        message: "Inventario actualizado",
      });
    } catch (error) {
      sendError(res, error);
    }
  };
}

export default InventoryMovementController;