import { CategoryModel } from "../models";
import { ICategory, IUser } from "../interfaces";
import AppDataSouce from "../database/datasource";

class CategoryRepository {
  repository;

  constructor() {
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

  async list(shopId: number) {
    return this.repository.find({
      where: {
        status: true,
        shopId,
      },
    });
  }

  async findOne(categoryId: number, shopId: number) {
    return this.repository.findOne({
      where: {
        shopId,
        id: categoryId,
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
