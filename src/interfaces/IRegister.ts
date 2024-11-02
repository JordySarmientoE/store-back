import { Role } from "./IUser";

export default interface IRegister {
  name: string;
  lastname: string;
  phone: number;
  password: string;
  email: string;
  shopId: number;
  role?: Role;
}
