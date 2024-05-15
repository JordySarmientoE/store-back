import pino from "pino";
import { IProduct, IUser } from "../interfaces";
import { ProductRepository } from "../repositories";
import { Types } from "mongoose";
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

  async create(user: IUser, product: IProduct, categoryId: Types.ObjectId) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const category = await this.categoryService.findOne(user, categoryId);
    const newProduct = await this.repository.create(
      user,
      product,
      category._id!
    );
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

  async findOne(user: IUser, id: Types.ObjectId) {
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

  async update(user: IUser, id: Types.ObjectId, product: IProduct) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    await this.repository.update(user, id, product);
    const newProduct = await this.repository.findOne(user, id);
    if (!newProduct) {
      throw {
        message: "Producto no existe",
        code: 400,
      };
    }
    return newProduct;
  }

  async delete(user: IUser, id: Types.ObjectId) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    await this.repository.delete(user, id);
    return {
      message: "Se elimino el producto",
    };
  }

  async listByCategory(user: IUser, categoryId: Types.ObjectId) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const category = await this.categoryService.findOne(user, categoryId);
    return this.repository.listByCategory(user, category._id!);
  }
}

export default ProductService;
