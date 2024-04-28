import pino from "pino";
import { IUser } from "../interfaces";
import { UserRepository } from "../repositories";
import { hashValue } from "../utils/bcrypt-helper";

class UserService {
  logger;
  userRepository;

  constructor() {
    this.logger = pino();
    this.userRepository = new UserRepository();
    this.register = this.register.bind(this);
  }

  async register(user: IUser) {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (userExists) {
      throw {
        message: "Correo ha sido tomado",
        code: 400,
      };
    }

    const newUser = user;
    newUser.password = hashValue(newUser.password);

    const userRepo = await this.userRepository.create(newUser);
    return userRepo;
  }
}

export default UserService;
