import { IShop } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";
import IUser, { RoleEnum } from "../interfaces/IUser";
import IPagination from "../repositories/IPagination";
import { keyLogger } from "../utils/error-helper";

class ShopService {
  logger;
  shopRepository;
  userRepository;
  constructor() {
    this.logger = keyLogger;
    this.shopRepository = new ShopRepository();
    this.userRepository = new UserRepository();
    this.register = this.register.bind(this);
    this.assignShop = this.assignShop.bind(this);
    this.getShops = this.getShops.bind(this);
    this.list = this.list.bind(this);
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
    const shop = await this.getShop(shopId);
    await this.userRepository.assignShop(userId, shop);
  }

  async getShops() {
    return this.shopRepository.list();
  }

  async list(page: number, rows: number): Promise<IPagination<IShop>> {
    const shops = await this.shopRepository.listPaginated(page, rows);
    const total = await this.shopRepository.totalShops();

    return {
      data: shops,
      total,
      page,
      nroPages: rows ? Math.ceil(total / rows) : 1,
    };
  }

  async getShop(shopId: number) {
    const shop = await this.shopRepository.findOne(shopId);
    if (!shop) {
      throw {
        message: "Tienda no existe",
        code: 400,
      };
    }
    return shop;
  }

  async delete(shopId: number) {
    await this.getShop(shopId);
    await this.shopRepository.delete(shopId);
  }

  async enable(shopId: number) {
    await this.shopRepository.enable(shopId);
  }

  async edit(shopId: number, body: IShop, user: IUser) {
    if (user.shop?.id !== shopId && user.role !== RoleEnum.ADMIN) {
      throw {
        message: "Usuario no tiene permitido editar",
        code: 404,
      };
    }
    return this.editShop(shopId, body);
  }

  async editShop(shopId: number, body: IShop) {
    const shop = await this.getShop(shopId);
    const shopExists = await this.shopRepository.findByRuc(body.ruc!);
    if (shopExists && shopExists.id !== shopId) {
      throw {
        message: "RUC no se encuentra disponible",
        code: 400,
      };
    }
    const newShop = Object.assign(shop, body);
    await this.shopRepository.edit(shopId, body);
    return newShop;
  }
}

export default ShopService;
