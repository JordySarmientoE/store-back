import AppDataSouce from "../database/datasource";
import { IInventoryMovement } from "../interfaces";
import { InventoryMovementModel } from "../models";

class InventoryMovementRepository {
  repository;

  constructor() {
    this.repository = AppDataSouce.getRepository(InventoryMovementModel);
  }

  async create(model: IInventoryMovement) {
    const newInventoryMovement = new InventoryMovementModel();
    newInventoryMovement.movementType = model.movementType;
    newInventoryMovement.product = model.product;
    newInventoryMovement.quantity = model.quantity;
    newInventoryMovement.shop = model.shop;
    await this.repository.save(newInventoryMovement);
    return model;
  }
}

export default InventoryMovementRepository;
