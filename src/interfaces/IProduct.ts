import { ICategory, IShop } from ".";
import IInventoryMovement from "./IInventoryMovement";
import IOrderProduct from "./IOrderProduct";

export default interface IProduct {
  name: string;
  description: string;
  id: number;
  status: boolean;
  category?: ICategory;
  quantity: number;
  price: number;
  shop?: IShop;
  orderProducts?: IOrderProduct[];
  inventoryMovements?: IInventoryMovement[];
  createdAt: Date;
  updatedAt: Date;
}
