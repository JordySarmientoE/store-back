import pino from "pino";
import { IRegister } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";
import { hashValue } from "../utils/bcrypt-helper";

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
    const shopExists = await this.shopRepository.findOne(user.shopId);
    if (!shopExists) {
      throw {
        message: "Tienda no existe",
        code: 404,
      };
    }

    const userExists = await this.userRepository.findByEmail(
      user.email,
      shopExists
    );
    if (userExists) {
      throw {
        message: "Correo ha sido tomado",
        code: 400,
      };
    }

    const newUser = user;
    newUser.password = hashValue(newUser.password);

    const userRepo = await this.userRepository.create(newUser, shopExists);
    return userRepo;
  }
}

export default UserService;
