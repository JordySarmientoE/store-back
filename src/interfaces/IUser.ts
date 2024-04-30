import { Types } from "mongoose";
import { IShop } from ".";

export default interface IUser {
  name: string;
  lastname: string;
  phone: number;
  password: string;
  email: string;
  _id: Types.ObjectId;
  shop?: IShop | undefined;
}
