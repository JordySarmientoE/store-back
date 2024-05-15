import { Types } from "mongoose";
import { ICategory, IShop } from ".";

export default interface IProduct {
  name: string;
  description: string;
  _id?: Types.ObjectId;
  status: boolean;
  category?: ICategory | undefined;
  quantity: number;
  price: number;
  shop?: IShop | undefined;
}
