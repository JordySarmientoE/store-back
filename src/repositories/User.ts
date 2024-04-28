import pino from "pino";
import { UserModel } from "../models";
import { IUser } from "../interfaces";

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
    const user = await UserModel.findOne({ email });
    return user;
  }

  async getById(uid: string) {
    const user = await UserModel.findById(uid);
    return user;
  }
}

export default UserRepository;
