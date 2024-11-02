import pino from "pino";
import { CategoryModel } from "../models";
import { ICategory, IUser } from "../interfaces";
import AppDataSouce from "../database/datasource";

class CategoryRepository {
  logger;
  repository;

  constructor() {
    this.logger = pino();
    this.create = this.create.bind(this);
    this.repository = AppDataSouce.getRepository(CategoryModel);
  }

  async create(user: IUser, category: ICategory) {
    const categoryModel = new CategoryModel();
    categoryModel.name = category.name;
    categoryModel.description = category.description;
    categoryModel.shop = user.shop;
    await this.repository.save(categoryModel);
    return categoryModel;
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
        shop: user.shop,
        id,
        status: true,
      },
      relations: ["products"],
    });
  }

  async update(id: number, category: ICategory) {
    return this.repository.update(id, category);
  }

  async delete(id: number) {
    return this.repository.update(id, { status: false });
  }
}

export default CategoryRepository;
