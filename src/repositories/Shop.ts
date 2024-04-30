import { IShop } from "../interfaces";
import { ShopModel } from "../models";

class ShopRepository {
  async create(shop: IShop) {
    const shopRepo = new ShopModel(shop);
    await shopRepo.save();
    return shopRepo;
  }
}

export default ShopRepository;
