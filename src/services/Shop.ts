import pino from "pino";
import { IShop } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";
import { RoleEnum } from "../interfaces/IUser";

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

  async assignShop(userId: number, shopId: number) {
    const user = await this.userRepository.getById(userId);
    if (user?.role === RoleEnum.ADMIN) {
      throw {
        message: "El usuario no se le puede asignar una tienda",
        code: 400,
      };
    }

    if (user?.shop) {
      throw {
        message: "El usuario ya cuenta con una tienda",
        code: 400,
      };
    }
    const shop = await this.shopRepository.findOne(shopId);
    if (!shop) {
      throw {
        message: "Tienda no existe",
        code: 400,
      };
    }
    await this.userRepository.assignShop(
      userId,
      shop
    );
  }
}

export default ShopService;
