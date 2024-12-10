import { UserModel } from "../models";
import { IShop } from "../interfaces";
import AppDataSouce from "../database/datasource";
import { RoleEnum } from "../interfaces/IUser";
import { IRegister } from "../interfaces/IAuth";

class UserRepository {
  repository;

  constructor() {
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

  async list(page: number, rows: number) {
    const skip = (page - 1) * rows;

    return this.repository.find({
      relations: ["shop"],
      skip,
      take: rows,
      order: {
        id: "ASC",
      },
    });
  }

  async totalUser() {
    return this.repository.count();
  }

  async delete(id: number) {
    return this.repository.update(id, { status: false });
  }

  async edit(id: number, body: IRegister) {
    return this.repository.update(id, body);
  }

  async enable(id: number) {
    return this.repository.update(id, { status: true });
  }
}

export default UserRepository;
