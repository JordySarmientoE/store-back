import { Role } from "./IUser";

export default interface IAuth {
    email: string;
    password: string;
}

export interface IRegister {
    name: string;
    lastname: string;
    phone: number;
    password: string;
    email: string;
    shopId: number;
    role?: Role;
  }