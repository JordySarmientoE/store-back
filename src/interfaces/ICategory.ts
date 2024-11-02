import IProduct from "./IProduct";
import IShop from "./IShop";

export default interface ICategory {
  name: string;
  description: string;
  id: number;
  status: boolean;
  shop?: IShop;
  products?: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}
