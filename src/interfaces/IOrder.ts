import IOrderProduct from "./IOrderProduct";
import IPayment from "./IPayment";
import IShop from "./IShop";

export default interface IOrder {
  total: number;
  id: number;
  status: boolean;
  shop?: IShop;
  payment?: IPayment;
  orderProducts?: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}
