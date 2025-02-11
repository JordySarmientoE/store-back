import { UserRepository } from "../repositories";
import IAuth from "../interfaces/IAuth";
import { hashValidate } from "../utils/bcrypt-helper";
import generateJWT from "../utils/jwt-helper";

class AuthService {
  userRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(auth: IAuth) {
    const user = await this.userRepository.findByEmail(auth.email.toLowerCase());
    if (!user) {
      throw {
        message: "Correo o la contraseña no son correctos",
        code: 400,
      };
    }

    const validPassword = hashValidate(auth.password, user.password!);
    if (!validPassword) {
      throw {
        message: "Correo o la contraseña no son correctos",
        code: 400,
      };
    }

    const token = await generateJWT(user.id);
    delete user.password;

    return { ...user, token };
  }
}

export default AuthService;
