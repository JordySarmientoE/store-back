import pino from "pino";
import { ProductModel } from "../models";
import { IProduct, IUser } from "../interfaces";
import { Types } from "mongoose";

class ProductRepository {
  logger;

  constructor() {
    this.logger = pino();
  }

  async create(
    user: IUser,
    product: IProduct,
    idCategory: Types.ObjectId
  ): Promise<IProduct> {
    const productModel = new ProductModel({
      shop: user.shop?._id,
      name: product.name,
      description: product.description,
      price: product.price || 0,
      quantity: product.quantity || 0,
      category: idCategory,
    });
    await productModel.save();
    return productModel.toObject();
  }

  async list(user: IUser) {
    return ProductModel.find({ shop: user.shop?._id, status: true })
      .populate("category")
      .exec();
  }

  async findOne(user: IUser, id: Types.ObjectId) {
    return ProductModel.findOne({
      _id: id,
      shop: user.shop?._id,
      status: true,
    })
      .populate("category")
      .exec();
  }

  async update(user: IUser, id: Types.ObjectId, product: IProduct) {
    return ProductModel.updateOne({ _id: id, shop: user.shop?._id }, product, {
      new: true,
    }).exec();
  }

  async delete(user: IUser, id: Types.ObjectId) {
    return ProductModel.updateOne(
      { _id: id, shop: user.shop?._id },
      { status: false },
      {
        new: true,
      }
    ).exec();
  }

  async listByCategory(user: IUser, idCategory: Types.ObjectId) {
    return ProductModel.find({
      shop: user.shop?._id,
      category: idCategory,
      status: true,
    });
  }
}

export default ProductRepository;
