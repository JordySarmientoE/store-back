import { Types } from "mongoose";

export default interface IShop {
  name: string;
  address: string;
  phone: number;
  _id?: Types.ObjectId;
}
