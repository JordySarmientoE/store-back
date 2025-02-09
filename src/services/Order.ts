import { OrderRepository } from "../repositories";
import { InventoryMovementService, OrderProductService, ShopService } from ".";
import { IShop, IUser } from "../interfaces";
import IInventoryMovement, {
  IMoveInventory,
} from "../interfaces/IInventoryMovement";
import IOrder, { ISaveOrder, Payment } from "../interfaces/IOrder";

class OrderService {
  repository;
  inventoryService;
  orderProductService;
  shopService;

  constructor() {
    this.repository = new OrderRepository();
    this.inventoryService = new InventoryMovementService();
    this.orderProductService = new OrderProductService();
    this.shopService = new ShopService();
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
    const { order, payment, shopId } = body;
    const shop = await this.shopService.getShop(shopId);
    const orderBody = this.createOrderBody(order);
    const products = await this.inventoryService.validateInventory(
      shopId,
      orderBody
    );
    const movements = await this.inventoryService.createMovements(
      shop,
      orderBody,
      products
    );

    await this.inventoryService.updateStockProducts(orderBody, products);

    const total = this.getTotalOrder(movements);
    const newOrder = await this.createOrder(total, payment, shop, user);

    const orderProducts = await this.orderProductService.createOrderProducts(
      shop,
      newOrder,
      movements
    );
    newOrder.orderProducts = orderProducts;

    return newOrder;
  }

  async createOrder(total: number, payment: Payment, shop: IShop, user: IUser) {
    const order = {
      total,
      payment,
      shop,
      user,
    } as IOrder;

    const newOrder = await this.repository.create(order);

    return newOrder;
  }
}

export default OrderService;
