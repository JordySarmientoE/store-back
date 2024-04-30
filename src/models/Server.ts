import express from "express";
import cors from "cors";
import pino from "pino";
import { UserRoutes, ShopRoutes, AuthRoutes, CategoryRoutes } from "../routes";
import dbConnection from "../database/config";

class Server {
  app: express.Application;
  port: string;
  logger: pino.BaseLogger;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.logger = pino();

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  listen() {
    this.app.listen(this.port, () => {
      this.logger.info(`Se inicio el servidor en el puerto ${this.port}`);
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
  }
}

export default Server;
