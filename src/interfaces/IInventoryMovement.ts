import IProduct from "./IProduct";
import IShop from "./IShop";

export type MovementType = "IN" | "OUT";

export enum MovementTypeEnum {
  IN = "IN",
  OUT = "OUT",
}

export default interface IInventoryMovement {
  id: number;
  status: boolean;
  shop?: IShop;
  movementType?: MovementType;
  quantity?: number;
  product?: IProduct;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMoveInventory {
  quantity: number;
  productId: number;
}
