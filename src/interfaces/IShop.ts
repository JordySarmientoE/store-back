import { StatusEnum } from "./IUser";

export default interface IShop {
  name: string;
  address?: string;
  phone?: string;
  id: number;
  status: boolean;
  ruc?: string;
  createdAt: Date;
  updatedAt: Date;
  email?: string;
}

export interface IListShops {
  rows: number;
  page: number;
  name?: string;
  address?: string;
  ruc?: string;
  phone?: string;
  email?: string;
  status?: StatusEnum;
}
