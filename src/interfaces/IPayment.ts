import Order from "../models/Order";

export default interface IPayment {
  type: string;
  id: number;
  status: boolean;
  orders?: Order[];
  createdAt: Date;
  updatedAt: Date;
}
