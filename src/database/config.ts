import AppDataSouce from "./datasource";
import Logger from "../utils/logger-helper";

const dbConnection = async () => {
  AppDataSouce.initialize()
    .then(() => {
      Logger.info("Conexión a la base de datos establecida");
    })
    .catch((error) => {
      Logger.error("Error al conectar con la base de datos", error);
    });
};

export default dbConnection;
