export default interface IShop {
  name: string;
  address?: string;
  phone?: string;
  id: number;
  status: boolean;
  ruc?: string;
  createdAt: Date;
  updatedAt: Date;
  email?: string;
}
