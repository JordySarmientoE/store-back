import AppDataSouce from "../database/datasource";
import { IOrder } from "../interfaces";
import { OrderModel } from "../models";

class OrderRepository {
  repository;

  constructor() {
    this.repository = AppDataSouce.getRepository(OrderModel);
  }

  async create(model: IOrder) {
    const newOrder = new OrderModel();
    Object.assign(newOrder, model);
    await this.repository.save(newOrder);
    return model;
  }
}

export default OrderRepository;
