import { Types } from "mongoose";

export default interface IShop {
  name: string;
  description: string;
  _id?: Types.ObjectId;
}
