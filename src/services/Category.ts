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

  async list(user: IUser) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    return this.repository.list(user);
  }

  async findOne(user: IUser, id: number): Promise<ICategory> {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const category = await this.repository.findOne(user, id);
    if (!category) {
      throw {
        message: "Categoria no existe",
        code: 400,
      };
    }
    return category as ICategory;
  }

  async update(user: IUser, id: number, category: ICategory) {
    const categorySearched = await this.findOne(user, id);
    await this.repository.update(id, category);
    const newCategory = Object.assign(categorySearched, category);
    return newCategory;
  }

  async delete(user: IUser, id: number) {
    await this.findOne(user, id);

    await this.repository.delete(id);
    return {
      message: "Se elimino la categoria",
    };
  }
}

export default CategoryService;
