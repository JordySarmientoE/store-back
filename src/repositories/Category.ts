import pino from "pino";
import { CategoryModel } from "../models";
import { ICategory, IUser } from "../interfaces";
import { Types } from "mongoose";

class CategoryRepository {
  logger;

  constructor() {
    this.logger = pino();
    this.create = this.create.bind(this);
  }

  async create(user: IUser, category: ICategory) {
    const categoryModel = new CategoryModel({
      shop: user.shop?._id,
      name: category.name,
      description: category.description,
    });
    await categoryModel.save();
    return categoryModel;
  }

  async list(user: IUser) {
    return CategoryModel.find({ shop: user.shop?._id, status: true });
  }

  async findOne(user: IUser, id: Types.ObjectId) {
    return CategoryModel.findOne({ _id: id, shop: user.shop?._id });
  }

  async update(user: IUser, id: Types.ObjectId, category: ICategory) {
    return CategoryModel.updateOne(
      { _id: id, shop: user.shop?._id },
      category,
      {
        new: true,
      }
    ).exec();
  }

  async delete(user: IUser, id: Types.ObjectId) {
    return CategoryModel.updateOne(
      { _id: id, shop: user.shop?._id },
      { status: false },
      {
        new: true,
      }
    ).exec();
  }
}

export default CategoryRepository;
