import pino from "pino";
import { IRegister, IUser } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";
import { hashValue } from "../utils/bcrypt-helper";
import generateJWT from "../utils/jwt-helper";

class UserService {
  logger;
  userRepository;
  shopRepository;

  constructor() {
    this.logger = pino();
    this.userRepository = new UserRepository();
    this.shopRepository = new ShopRepository();
    this.register = this.register.bind(this);
  }

  async register(user: IRegister) {
    const userExists = await this.userRepository.findByEmail(
      user.email
    );
    if (userExists) {
      throw {
        message: "Correo ha sido tomado",
        code: 400,
      };
    }

    const newUser = user;
    newUser.password = hashValue(newUser.password);

    const userRepo = await this.userRepository.create(newUser);
    delete userRepo.password;
    return userRepo;
  }

  async getInfo(user: IUser) {
    const token = await generateJWT(user.id);
    return {
      ...user,
      token,
    }
  }
}

export default UserService;
