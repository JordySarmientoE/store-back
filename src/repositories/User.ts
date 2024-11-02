import pino from "pino";
import { UserModel } from "../models";
import { IRegister, IShop } from "../interfaces";
import AppDataSouce from "../database/datasource";
import { RoleEnum } from "../interfaces/IUser";

class UserRepository {
  logger;
  repository;

  constructor() {
    this.logger = pino();
    this.create = this.create.bind(this);
    this.repository = AppDataSouce.getRepository(UserModel);
  }

  async create(user: IRegister, shop: IShop) {
    const newUser = new UserModel();
    Object.assign(newUser, user);
    newUser.shop = shop;
    newUser.role = user.role ?? RoleEnum.BUYER;
    await this.repository.save(newUser);
    return newUser;
  }

  async findByEmail(email: string, shop: IShop) {
    return this.repository.findOne({
      where: {
        status: true,
        email,
        shop,
      },
    });
  }

  async getById(id: number, shopId: number) {
    return this.repository.findOne({
      where: {
        shopId,
        id,
        status: true,
      },
      relations: ["shop"],
    });
  }

  async assignShop(id: number, shop: IShop) {
    return this.repository.update(id, { shop });
  }
}

export default UserRepository;
