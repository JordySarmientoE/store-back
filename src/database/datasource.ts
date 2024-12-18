import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  CategoryModel,
  OrderModel,
  OrderProductModel,
  ProductModel,
  ShopModel,
  UserModel,
} from "../models";
import InventoryMovement from "../models/InventoryMovement";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST as string | "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "postgres",
  synchronize: false,
  logging: true,
  entities: [
    ShopModel,
    UserModel,
    CategoryModel,
    ProductModel,
    OrderModel,
    OrderProductModel,
    InventoryMovement,
  ],
  migrations: ["dist/migrations/*.js"],
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false,
});

export default AppDataSource;
