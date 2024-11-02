import IProduct from "./IProduct";
import IShop from "./IShop";

export type MovementType = "IN" | "OUT";

export default interface IInventoryMovent {
  id: number;
  status: boolean;
  shop?: IShop;
  movementType?: MovementType;
  quantity?: number;
  product?: IProduct;
  createdAt: Date;
  updatedAt: Date;
}
