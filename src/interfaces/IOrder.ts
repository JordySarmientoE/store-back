import { IMoveInventory } from "./IInventoryMovement";
import IOrderProduct from "./IOrderProduct";
import IShop from "./IShop";

export type Payment = "YAPE" | "PLIN" | "EFECTIVO" | "TRANSFERENCIA" | "CREDITO";

export default interface IOrder {
  total: number;
  id: number;
  status: boolean;
  shop?: IShop;
  payment?: Payment;
  orderProducts?: IOrderProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaveOrder {
  order: IMoveInventory[],
  shopId: number;
  payment: Payment;
}