import { ICategory, IShop } from ".";
import IInventoryMovent from "./IInventoryMovement";
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
  inventoryMovements?: IInventoryMovent[];
  createdAt: Date;
  updatedAt: Date;
}
