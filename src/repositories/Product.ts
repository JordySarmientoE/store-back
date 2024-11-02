import pino from "pino";
import { ProductModel } from "../models";
import { ICategory, IProduct, IUser } from "../interfaces";
import AppDataSouce from "../database/datasource";

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

  async list(user: IUser) {
    return this.repository.find({
      where: {
        shop: user.shop,
        status: true,
      },
    });
  }

  async findOne(user: IUser, id: number) {
    return this.repository.findOne({
      where: {
        id,
        shop: user.shop,
        status: true,
      },
      relations: ["category"],
    });
  }

  async update(id: number, product: IProduct) {
    return this.repository.update(id, product);
  }

  async delete(id: number) {
    return this.repository.update(id, { status: false });
  }

  async listByCategory(user: IUser, categoryId: number) {
    return this.repository.find({
      where: {
        shop: user.shop,
        status: true,
        categoryId,
      },
    });
  }
}

export default ProductRepository;
