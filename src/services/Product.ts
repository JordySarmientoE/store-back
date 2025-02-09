import { IProduct, IUser } from "../interfaces";
import {
  InventoryMovementRepository,
  ProductRepository,
} from "../repositories";
import { CategoryService } from ".";
import IPagination from "../repositories/IPagination";
import IInventoryMovement, { MovementTypeEnum } from "../interfaces/IInventoryMovement";

class ProductService {
  repository;
  categoryService;
  inventoryMovementRepository;

  constructor() {
    this.repository = new ProductRepository();
    this.categoryService = new CategoryService();
    this.inventoryMovementRepository = new InventoryMovementRepository();
  }

  async create(user: IUser, product: IProduct, categoryId: number) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const category = await this.categoryService.findOne(
      categoryId,
      user.shop!.id
    );
    const newProduct = await this.repository.create(user, product, category);
    newProduct.category = category;
    return newProduct;
  }

  async list(shopId: number) {
    return this.repository.list(shopId);
  }

  async listPaginated(
    user: IUser,
    page: number,
    rows: number
  ): Promise<IPagination<IProduct>> {
    const shops = await this.repository.listPaginated(
      user.shop!.id,
      page,
      rows
    );
    const total = await this.repository.totalProducts();

    return {
      data: shops,
      total,
      page,
      nroPages: rows ? Math.ceil(total / rows) : 1,
    };
  }

  async findOne(productId: number, shopId: number) {
    const product = await this.repository.findOne(productId, shopId);
    if (!product) {
      throw {
        message: "Producto no existe",
        code: 400,
      };
    }
    return product;
  }

  async findMany(productIds: number[], shopId: number) {
    const products = await this.repository.findMany(productIds, shopId);
    if (productIds.length !== products.length) {
      throw {
        message: "Algún producto no existe",
        code: 400,
      };
    }
    return products;
  }

  async update(user: IUser, id: number, product: IProduct) {
    const newProduct = await this.findOne(id, user.shop!.id);
    if (product.quantity) {
      const changeQuantity = product.quantity - newProduct.quantity;
      if (changeQuantity !== 0) {
        await this.inventoryMovementRepository.create({
          product: newProduct,
          quantity: Math.abs(changeQuantity),
          movementType: changeQuantity > 0 ? MovementTypeEnum.IN : MovementTypeEnum.OUT,
          shop: user.shop,
        } as IInventoryMovement);
      }
    }
    Object.assign(newProduct, product);
    await this.repository.update(id, newProduct);
    return newProduct;
  }

  async delete(user: IUser, id: number) {
    await this.findOne(id, user.shop!.id);
    await this.repository.delete(id);
    return {
      message: "Se elimino el producto",
    };
  }

  async listByCategory(categoryId: number, shopId: number) {
    const category = await this.repository.listByCategory(categoryId, shopId);
    if (!category) {
      throw {
        message: "Categoria no existe",
        code: 404,
      };
    }
    return category;
  }

  async updateMany(products: IProduct[]) {
    const promises = products.map((product) =>
      this.repository.update(product.id!, product)
    );
    await Promise.all(promises);
  }
}

export default ProductService;
