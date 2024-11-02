import IOrder from "./IOrder";
import IProduct from "./IProduct";
import IShop from "./IShop";

export default interface IOrderProduct {
  total: number;
  price: number;
  quantity: number;
  id: number;
  status: boolean;
  shop?: IShop;
  product?: IProduct;
  order?: IOrder;
  createdAt: Date;
  updatedAt: Date;
}
