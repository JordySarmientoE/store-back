import pino from "pino";
import { ICategory, IUser } from "../interfaces";
import { CategoryRepository } from "../repositories";

class CategoryService {
  logger;
  repository;

  constructor() {
    this.logger = pino();
    this.repository = new CategoryRepository();
    this.create = this.create.bind(this);
  }

  async create(user: IUser, category: ICategory) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const newCategory = await this.repository.create(user, category);
    return newCategory;
  }

  async list(shopId: number) {
    return this.repository.list(shopId);
  }

  async findOne(categoryId: number, shopId: number): Promise<ICategory> {
    const category = await this.repository.findOne(categoryId, shopId);
    if (!category) {
      throw {
        message: "Categoria no existe",
        code: 400,
      };
    }
    return category;
  }

  async update(user: IUser, id: number, category: ICategory) {
    const categorySearched = await this.findOne(id, user.shop!.id);
    await this.repository.update(id, category);
    const newCategory = Object.assign(categorySearched, category);
    return newCategory;
  }

  async delete(user: IUser, id: number) {
    await this.findOne(id, user.shop!.id);

    await this.repository.delete(id);
    return {
      message: "Se elimino la categoria",
    };
  }
}

export default CategoryService;
