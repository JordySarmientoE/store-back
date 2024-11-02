import pino from "pino";
import { ShopRepository, UserRepository } from "../repositories";
import IAuth from "../interfaces/IAuth";
import { hashValidate } from "../utils/bcrypt-helper";
import generateJWT from "../utils/jwt-helper";

class AuthService {
  logger;
  userRepository;
  shopRepository;

  constructor() {
    this.logger = pino();
    this.userRepository = new UserRepository();
    this.shopRepository = new ShopRepository();
    this.login = this.login.bind(this);
  }

  async login(auth: IAuth) {
    const shop = await this.shopRepository.findOne(auth.shopId);
    if (!shop) {
      throw {
        message: "Tienda no existe",
        code: 400,
      };
    }
    const user = await this.userRepository.findByEmail(auth.email, shop);
    if (!user) {
      throw {
        message: "Usuario / Password no son correctos",
        code: 400,
      };
    }

    const validPassword = hashValidate(auth.password, user.password!);
    if (!validPassword) {
      throw {
        message: "Usuario / Password no son correctos",
        code: 400,
      };
    }

    const token = await generateJWT(user.id, user.shopId!);

    return { ...user, token };
  }
}

export default AuthService;
