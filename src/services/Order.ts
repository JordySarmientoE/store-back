import pino from "pino";
import { OrderRepository } from "../repositories";
import { InventoryMovementService, OrderProductService } from ".";
import { IUser } from "../interfaces";
import IInventoryMovement, {
  IMoveInventory,
} from "../interfaces/IInventoryMovement";
import IOrder, { ISaveOrder, Payment } from "../interfaces/IOrder";

class OrderService {
  logger;
  repository;
  inventoryService;
  orderProductService;

  constructor() {
    this.logger = pino();
    this.repository = new OrderRepository();
    this.inventoryService = new InventoryMovementService();
    this.save = this.save.bind(this);
    this.orderProductService = new OrderProductService();
  }

  getTotalOrder(movements: IInventoryMovement[]) {
    const total = movements.reduce(
      (prev, curr) => prev + curr.quantity! * curr.product!.price,
      0
    );
    return total * -1;
  }

  createOrderBody(orders: IMoveInventory[]) {
    return orders.map((order) => {
      return {
        ...order,
        quantity: order.quantity * -1,
      };
    });
  }

  async save(user: IUser, body: ISaveOrder) {
    const { order, payment } = body;
    const orderBody = this.createOrderBody(order);
    const products = await this.inventoryService.validateInventory(
      user,
      orderBody
    );
    const movements = await this.inventoryService.createMovements(
      user,
      orderBody,
      products
    );

    await this.inventoryService.updateStockProducts(orderBody, products);

    const total = this.getTotalOrder(movements);
    const newOrder = await this.createOrder(total, payment, user);

    const orderProducts = await this.orderProductService.createOrderProducts(
      user,
      newOrder,
      movements
    );
    newOrder.orderProducts = orderProducts;

    return newOrder;
  }

  async createOrder(total: number, payment: Payment, user: IUser) {
    const order = {
      total,
      payment,
      shop: user.shop!,
    } as IOrder;

    const newOrder = await this.repository.create(order);

    return newOrder;
  }
}

export default OrderService;
