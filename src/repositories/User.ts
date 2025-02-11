import { UserModel } from "../models";
import { IShop } from "../interfaces";
import AppDataSouce from "../database/datasource";
import { IListUser, RoleEnum, StatusEnum } from "../interfaces/IUser";
import { IRegister } from "../interfaces/IAuth";
import { ILike, Like } from "typeorm";

class UserRepository {
  repository;

  constructor() {
    this.repository = AppDataSouce.getRepository(UserModel);
  }

  async create(user: IRegister) {
    const newUser = new UserModel();
    Object.assign(newUser, user);
    newUser.role = user.role ?? RoleEnum.BUYER;
    newUser.email = user.email.toLowerCase();
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

  async list(payload: IListUser) {
    const { page, rows } = payload;
    const skip = (page - 1) * rows;

    const status = payload.status === StatusEnum.ENABLED ? true : (payload.status === StatusEnum.DISABLED ? false : undefined);
    return this.repository.find({
      relations: ["shop"],
      skip,
      take: rows,
      order: {
        id: "ASC",
      },
      where: {
        ...(payload.name && { name: ILike(`${payload.name}%`) }),
        ...(payload.email && { email: ILike(`${payload.email}%`) }),
        ...(payload.role && { role: payload.role }),
        ...(status !== undefined && { status }),
        ...(payload.phone && { phone: Like(`${payload.phone}%`) }),
        ...(payload.lastname && { lastname: ILike(`${payload.lastname}%`) }),
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
    const user = { ...body };
    user.email = body.email.toLowerCase();
    return this.repository.update(id, user);
  }

  async enable(id: number) {
    return this.repository.update(id, { status: true });
  }
}

export default UserRepository;
