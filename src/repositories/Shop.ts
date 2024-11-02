import AppDataSouce from "../database/datasource";
import { IShop } from "../interfaces";
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

  async findByRuc(ruc: string) {
    return this.repository.findOne({
      where: {
        ruc,
      },
    });
  }
}

export default ShopRepository;
