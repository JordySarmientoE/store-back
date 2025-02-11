import { ILike, Like } from "typeorm";
import AppDataSouce from "../database/datasource";
import { IShop } from "../interfaces";
import { IListShops } from "../interfaces/IShop";
import { StatusEnum } from "../interfaces/IUser";
import { ShopModel } from "../models";

class ShopRepository {
  repository;

  constructor() {
    this.repository = AppDataSouce.getRepository(ShopModel);
  }

  async create(shop: IShop) {
    const newShop = new ShopModel();
    Object.assign(newShop, shop);
    await this.repository.save(newShop);
    return newShop;
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ["products", "products.category"],
    });
  }

  async list() {
    return this.repository.find({
      where: {
        status: true,
      },
    });
  }

  async listPaginated(payload: IListShops) {
    const { page, rows } = payload;
    const skip = (page - 1) * rows;
    const status = payload.status === StatusEnum.ENABLED ? true : (payload.status === StatusEnum.DISABLED ? false : undefined);

    return this.repository.find({
      skip,
      take: rows,
      order: {
        id: "ASC",
      },
      where: {
        ...(payload.name && { name: ILike(`${payload.name}%`) }),
        ...(payload.ruc && { ruc: Like(`${payload.ruc}%`) }),
        ...(status !== undefined && { status }),
        ...(payload.address && { address: ILike(`${payload.address}%`) }),
        ...(payload.phone && { phone: Like(`${payload.phone}%`) }),
      },
    });
  }

  async findByRuc(ruc: string) {
    return this.repository.findOne({
      where: {
        ruc,
      },
    });
  }

  async totalShops() {
    return this.repository.count();
  }

  async delete(shopId: number) {
    return this.repository.update(shopId, { status: false });
  }

  async enable(shopId: number) {
    return this.repository.update(shopId, { status: true });
  }

  async edit(shopId: number, shop: IShop) {
    return this.repository.update(shopId, shop);
  }
}

export default ShopRepository;
