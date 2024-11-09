import pino from "pino";
import IUser from "../interfaces/IUser";
import {
  IMoveInventory,
  MovementTypeEnum,
} from "../interfaces/IInventoryMovement";
import { InventoryMovementRepository } from "../repositories";
import ProductService from "./Product";
import { IInventoryMovement, IProduct } from "../interfaces";

class InventoryMovementService {
  logger;
  repository;
  productService;
  constructor() {
    this.logger = pino();
    this.moveInventory = this.moveInventory.bind(this);
    this.repository = new InventoryMovementRepository();
    this.productService = new ProductService();
  }

  async validateInventory(user: IUser, body: IMoveInventory[]) {
    const productIds = body.map((product) => product.productId);
    const products = await this.productService.findMany(
      productIds,
      user.shop!.id
    );

    for (const product of products) {
      const productSearched = body.find(
        (prod) => prod.productId === product.id
      );

      const newStock = product.quantity + productSearched!.quantity;
      if (newStock < 0) {
        throw {
          message: "Producto no cuenta con suficiente cantidad de stock",
          code: 400,
        };
      }
    }

    return products;
  }

  async createMovements(
    user: IUser,
    body: IMoveInventory[],
    products: IProduct[]
  ) {
    const inventoryMovements = [];
    for (const product of products) {
      const productSearched = body.find(
        (prod) => prod.productId === product.id
      );

      const movementType =
        productSearched!.quantity >= 0
          ? MovementTypeEnum.IN
          : MovementTypeEnum.OUT;

      const inventoryMovement = {
        quantity: productSearched!.quantity,
        product: product,
        shop: user.shop!,
        movementType,
      } as IInventoryMovement;

      inventoryMovements.push(inventoryMovement);
    }

    const promises = inventoryMovements.map((inventoryMovement) =>
      this.repository.create(inventoryMovement)
    );
    await Promise.all(promises);
    return inventoryMovements;
  }

  async updateStockProducts(body: IMoveInventory[], products: IProduct[]) {
    for (const product of products) {
      const productSearched = body.find(
        (prod) => prod.productId === product.id
      );
      product.quantity = product.quantity + productSearched!.quantity;
    }
    await this.productService.updateMany(products);
  }

  async moveInventory(user: IUser, body: IMoveInventory) {
    const inventoryMovements = [body];
    const products = await this.validateInventory(user, inventoryMovements);
    await this.createMovements(user, inventoryMovements, products);
    await this.updateStockProducts(inventoryMovements, products);
  }
}

export default InventoryMovementService;
