import AppDataSouce from "../database/datasource";
import { IOrderProduct } from "../interfaces";
import { OrderProductModel } from "../models";

class OrderProductRepository {
  repository;

  constructor() {
    this.repository = AppDataSouce.getRepository(OrderProductModel);
  }

  async createMany(models: IOrderProduct[]) {
    const newOrderProducts = [];
    for (const model of models) {
      const orderProd = new OrderProductModel();
      Object.assign(orderProd, model);
      newOrderProducts.push(orderProd);
    }
    await this.repository.save(newOrderProducts);
    return newOrderProducts;
  }
}

export default OrderProductRepository;
