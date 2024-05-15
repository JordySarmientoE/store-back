import pino from "pino";
import { ICategory, IUser } from "../interfaces";
import { CategoryRepository } from "../repositories";
import { Types } from "mongoose";

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

  async findOne(user: IUser, id: Types.ObjectId): Promise<ICategory> {
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
    return category;
  }

  async update(user: IUser, id: Types.ObjectId, category: ICategory) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    await this.repository.update(user, id, category);
    const newCategory = await this.repository.findOne(user, id);
    if (!newCategory) {
      throw {
        message: "Categoria no existe",
        code: 400,
      };
    }
    return newCategory;
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
      message: "Se elimino la categoria",
    };
  }
}

export default CategoryService;
