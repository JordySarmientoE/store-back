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

  async create(user: IRegister) {
    const newUser = new UserModel();
    Object.assign(newUser, user);
    newUser.role = user.role ?? RoleEnum.BUYER;
    await this.repository.save(newUser);
    return newUser;
  }

  async findByEmail(email: string) {
    return this.repository.findOne({
      where: {
        status: true,
        email,
      },
      relations: ["shop"],
    });
  }

  async getById(id: number) {
    const user = await this.repository.findOne({
      where: {
        id,
        status: true,
      },
      relations: ["shop"],
    });
    if (user) {
      delete user.password;
    }
    return user;
  }

  async assignShop(id: number, shop: IShop) {
    return this.repository.update(id, { shop, role: RoleEnum.VENDOR });
  }
}

export default UserRepository;
