import pino from "pino";
import { UserRepository } from "../repositories";
import IAuth from "../interfaces/IAuth";
import { hashValidate } from "../utils/bcrypt-helper";
import generateJWT from "../utils/jwt-helper";

class AuthService {
  logger;
  userRepository;

  constructor() {
    this.logger = pino();
    this.userRepository = new UserRepository();
    this.login = this.login.bind(this);
  }

  async login(auth: IAuth) {
    const user = await this.userRepository.findByEmail(auth.email);
    if (!user || !user.status) {
      throw {
        message: "Usuario / Password no son correctos",
        code: 400,
      };
    }

    const validPassword = hashValidate(auth.password, user.password);
    if (!validPassword) {
      throw {
        message: "Usuario / Password no son correctos",
        code: 400,
      };
    }

    const token = await generateJWT(user.id);

    return {...user.toObject(), token};
  }
}

export default AuthService;
