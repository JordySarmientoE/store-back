import pino from "pino";
import { IUser, IShop } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";

class ShopService {
  logger;
  shopRepository;
  userRepository;
  constructor() {
    this.logger = pino();
    this.shopRepository = new ShopRepository();
    this.userRepository = new UserRepository();
    this.register = this.register.bind(this);
  }

  async register(shop: IShop) {
    const newShop = await this.shopRepository.create(shop);
    return newShop;
  }

  async assignShop(user: IUser, newUser: number) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const userShop = await this.userRepository.assignShop(
      newUser,
      user.shop
    );
    return userShop;
  }
}

export default ShopService;
