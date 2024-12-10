import { OrderProductRepository } from "../repositories";
import { IInventoryMovement, IOrder, IOrderProduct, IShop } from "../interfaces";
import { keyLogger } from "../utils/error-helper";

class OrderProductService {
  logger;
  repository;

  constructor() {
    this.logger = keyLogger;
    this.repository = new OrderProductRepository();
    this.createMany = this.createMany.bind(this);
  }

  async createMany(orderProducts: IOrderProduct[]) {
    return this.repository.createMany(orderProducts);
  }

  async createOrderProducts(
    shop: IShop,
    order: IOrder,
    movements: IInventoryMovement[]
  ) {
    const orderProducts = [];
    for (const movement of movements) {
      const { quantity, product } = movement;
      const orderProduct = {
        shop,
        order,
        product: product,
        quantity: quantity! * -1,
        price: product!.price,
        total: product!.price * quantity! * -1,
      } as IOrderProduct;

      orderProducts.push(orderProduct);
    }

    const newOrderProduct = await this.createMany(
      orderProducts
    );
    
    for (const orderProduct of newOrderProduct) {
      delete orderProduct.order;
      delete orderProduct.shop;
    }

    return newOrderProduct;
  }
}

export default OrderProductService;
