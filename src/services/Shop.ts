import { IShop } from "../interfaces";
import { ShopRepository, UserRepository } from "../repositories";
import IUser, { RoleEnum } from "../interfaces/IUser";
import IPagination from "../repositories/IPagination";
import { IListShops } from "../interfaces/IShop";

class ShopService {
  shopRepository;
  userRepository;
  constructor() {
    this.shopRepository = new ShopRepository();
    this.userRepository = new UserRepository();
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

  async list(payload: IListShops): Promise<IPagination<IShop>> {
    const { page, rows } = payload;
    const shops = await this.shopRepository.listPaginated(payload);
    const total = await this.shopRepository.totalShops();

    return {
      data: shops,
      total,
      page: Number(page),
      nroPages: Math.ceil(total / rows),
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
