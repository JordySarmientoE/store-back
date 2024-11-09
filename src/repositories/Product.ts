import pino from "pino";
import { ProductModel } from "../models";
import { ICategory, IProduct, IUser } from "../interfaces";
import AppDataSouce from "../database/datasource";
import { In } from "typeorm";

class ProductRepository {
  logger;
  repository;

  constructor() {
    this.logger = pino();
    this.repository = AppDataSouce.getRepository(ProductModel);
  }

  async create(
    user: IUser,
    product: IProduct,
    category: ICategory
  ): Promise<IProduct> {
    const productModel = new ProductModel();
    Object.assign(productModel, product);
    productModel.category = category;
    productModel.shop = user.shop;
    await this.repository.save(productModel);
    return productModel;
  }

  async list(shopId: number) {
    return this.repository.find({
      where: {
        shopId,
        status: true,
      },
    });
  }

  async findOne(productId: number, shopId: number) {
    return this.repository.findOne({
      where: {
        id: productId,
        shopId,
        status: true,
      },
      relations: ["category"],
    });
  }

  async findMany(productIds: number[], shopId: number) {
    return this.repository.find({
      where: {
        id: In(productIds),
        shopId,
        status: true,
      },
    });
  }

  async update(id: number, product: IProduct) {
    return this.repository.update(id, product);
  }

  async delete(id: number) {
    return this.repository.update(id, { status: false });
  }

  async listByCategory(categoryId: number, shopId: number) {
    return this.repository.find({
      where: {
        shopId,
        status: true,
        categoryId,
      },
    });
  }
}

export default ProductRepository;
