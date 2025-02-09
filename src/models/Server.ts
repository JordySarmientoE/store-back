import express from "express";
import cors from "cors";
import {
  UserRoutes,
  ShopRoutes,
  AuthRoutes,
  CategoryRoutes,
  ProductRoutes,
  InventorymovementRoutes,
  OrderRoutes,
} from "../routes";
import dbConnection from "../database/config";
import Logger from "../utils/logger-helper";

class Server {
  app: express.Application;
  port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Se inicio el servidor en el puerto ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/api/user", UserRoutes);
    this.app.use("/api/shop", ShopRoutes);
    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/category", CategoryRoutes);
    this.app.use("/api/product", ProductRoutes);
    this.app.use("/api/inventory-movement", InventorymovementRoutes);
    this.app.use("/api/order", OrderRoutes);
  }
}

export default Server;
