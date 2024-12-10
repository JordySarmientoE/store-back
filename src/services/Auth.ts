import { UserRepository } from "../repositories";
import IAuth from "../interfaces/IAuth";
import { hashValidate } from "../utils/bcrypt-helper";
import generateJWT from "../utils/jwt-helper";
import { keyLogger } from "../utils/error-helper";

class AuthService {
  logger;
  userRepository;

  constructor() {
    this.logger = keyLogger;
    this.userRepository = new UserRepository();
    this.login = this.login.bind(this);
  }

  async login(auth: IAuth) {
    const user = await this.userRepository.findByEmail(auth.email);
    if (!user) {
      throw {
        message: "Usuario / Password no son correctos",
        code: 400,
      };
    }

    const validPassword = hashValidate(auth.password, user.password!);
    if (!validPassword) {
      throw {
        message: "Usuario / Password no son correctos",
        code: 400,
      };
    }

    const token = await generateJWT(user.id);
    delete user.password;

    return { ...user, token };
  }
}

export default AuthService;
