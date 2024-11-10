import IOrder from "./IOrder";
import IShop from "./IShop";

export type Role = RoleEnum.ADMIN | RoleEnum.BUYER | RoleEnum.VENDOR;
export enum RoleEnum {
  ADMIN = "ADMIN",
  BUYER = "BUYER",
  VENDOR = "VENDOR",
}

export default interface IUser {
  name: string;
  lastname: string;
  phone: string;
  password?: string;
  email?: string;
  id: number;
  shop?: IShop;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: Role;
  orders?: IOrder[];
}
