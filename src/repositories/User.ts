import pino from "pino";
import { UserModel } from "../models";
import { IUser } from "../interfaces";
import { Types } from "mongoose";

class UserRepository {
  logger;

  constructor() {
    this.logger = pino();
    this.create = this.create.bind(this);
  }

  async create(user: IUser) {
    const userRepo = new UserModel(user);
    await userRepo.save();
    return userRepo;
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email }).populate("shop").exec();
    return user;
  }

  async getById(uid: string) {
    const user = await UserModel.findById(uid).populate("shop").exec();
    return user;
  }

  async assignShop(idUser: Types.ObjectId, idShop: Types.ObjectId) {
    const newUser = await UserModel.findByIdAndUpdate(
      idUser,
      { shop: idShop },
      { new: true }
    )
      .populate("shop")
      .exec();
    return newUser;
  }
}

export default UserRepository;
