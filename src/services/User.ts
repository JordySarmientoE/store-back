import { IUser } from "../interfaces";
import { UserRepository } from "../repositories";
import { hashValue } from "../utils/bcrypt-helper";
import generateJWT from "../utils/jwt-helper";
import { IRegister } from "../interfaces/IAuth";
import IPagination from "../repositories/IPagination";
import { IListUser, RoleEnum } from "../interfaces/IUser";

class UserService {
  userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(user: IRegister) {
    const userExists = await this.userRepository.findByEmail(user.email.toLowerCase());
    if (userExists) {
      throw {
        message: "Correo no se encuentra disponible",
        code: 400,
      };
    }

    const newUser = user;
    newUser.password = hashValue(newUser.password!);

    const userRepo = await this.userRepository.create(newUser);
    delete userRepo.password;
    return userRepo;
  }

  async getInfo(user: IUser) {
    const token = await generateJWT(user.id);
    return {
      ...user,
      token,
    };
  }

  async list(payload: IListUser): Promise<IPagination<IUser>> {
    const { page, rows } = payload;
    const total = await this.userRepository.totalUser();
    let users = await this.userRepository.list(payload);
    users = users.map((user) => {
      delete user.password;
      return user;
    });
    return {
      data: users,
      total,
      page: Number(page),
      nroPages: Math.ceil(total / rows),
    };
  }

  async findOne(userId: number) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw {
        message: "Usuario no existe o está inactivo",
        code: 400,
      };
    }
    return user;
  }

  async delete(userId: number) {
    await this.findOne(userId);
    await this.userRepository.delete(userId);
  }

  async edit(userId: number, body: IRegister, user: IUser) {
    if (user.id !== userId && user.role !== RoleEnum.ADMIN) {
      throw {
        message: "Usuario no tiene permitido editar",
        code: 404,
      };
    }
    return this.editUser(userId, body);
  }

  async editUser(userId: number, body: IRegister) {
    const usuario = await this.findOne(userId);
    const userExists = await this.userRepository.findByEmail(body.email.toLowerCase());
    if (userExists && userExists.id !== userId) {
      throw {
        message: "Correo no se encuentra disponible",
        code: 400,
      };
    }
    const newUser = Object.assign(usuario, body);
    newUser.password = hashValue(newUser.password!);
    await this.userRepository.edit(userId, newUser);
    delete newUser.password;
    return newUser;
  }

  async enable(userId: number) {
    await this.userRepository.enable(userId);
  }
}

export default UserService;
