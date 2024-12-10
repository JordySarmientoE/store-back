import CustomRequest from "../interfaces/CustomRequest";
import { Response } from "express";
import sendError, { keyLogger } from "../utils/error-helper";
import { InventoryMovementService } from "../services";

class InventoryMovementController {
  logger;
  service;
  constructor() {
    this.logger = keyLogger;
    this.service = new InventoryMovementService();
    this.moveInventory = this.moveInventory.bind(this);
  }

  async moveInventory(req: CustomRequest, res: Response) {
    try {
      this.logger.info("-- Request --");
      this.logger.info(req.body);
      const user = req.user!;
      await this.service.moveInventory(user, req.body);
      res.json({
        message: "Inventario actualizado",
      });
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default InventoryMovementController;
