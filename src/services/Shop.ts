import pino from "pino";
import { IUser, IShop } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";
import { Types } from "mongoose";

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

  async register(user: IUser, shop: IShop) {
    const newShop = await this.shopRepository.create(shop);
    const newUser = await this.userRepository.assignShop(user._id, newShop._id);
    return newUser;
  }

  async assignShop(user: IUser, newUser: Types.ObjectId) {
    if (!user.shop) {
      throw {
        message: "Usuario no cuenta con tienda",
        code: 400,
      };
    }
    const userShop = await this.userRepository.assignShop(
      newUser,
      user.shop._id!
    );
    return userShop;
  }
}

export default ShopService;
