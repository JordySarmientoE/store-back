import pino from "pino";
import { IProduct, IUser } from "../interfaces";
import { ProductRepository } from "../repositories";
import { CategoryService } from ".";

class ProductService {
  logger;
  repository;
  categoryService;

  constructor() {
    this.logger = pino();
    this.repository = new ProductRepository();
    this.categoryService = new CategoryService();
    this.create = this.create.bind(this);
  }

  async create(user: IUser, product: IProduct, categoryId: number) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const category = await this.categoryService.findOne(user, categoryId);
    const newProduct = await this.repository.create(user, product, category);
    newProduct.category = category;
    return newProduct;
  }

  async list(user: IUser) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    return this.repository.list(user);
  }

  async findOne(user: IUser, id: number) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const product = await this.repository.findOne(user, id);
    if (!product) {
      throw {
        message: "Producto no existe",
        code: 400,
      };
    }
    return product;
  }

  async update(user: IUser, id: number, product: IProduct) {
    const newProduct = await this.findOne(user, id);
    await this.repository.update(id, product);
    if (!newProduct) {
      throw {
        message: "Producto no existe",
        code: 400,
      };
    }
    return newProduct;
  }

  async delete(user: IUser, id: number) {
    await this.findOne(user, id);
    await this.repository.delete(id);
    return {
      message: "Se elimino el producto",
    };
  }

  async listByCategory(user: IUser, categoryId: number) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const category = await this.repository.listByCategory(user, categoryId);
    if (!category) {
      throw {
        message: "Categoria no existe",
        code: 404,
      };
    }
    return category;
  }
}

export default ProductService;
