import { Types } from "mongoose";

export default interface ICategory {
  name: string;
  description: string;
  _id?: Types.ObjectId;
  status: boolean;
}
