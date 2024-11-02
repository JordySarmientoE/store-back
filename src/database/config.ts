import AppDataSouce from "./datasource";

const dbConnection = async () => {
  AppDataSouce.initialize()
    .then(() => {
      console.log("Conexión a la base de datos establecida");
    })
    .catch((error) => {
      console.error("Error al conectar con la base de datos", error);
    });
};

export default dbConnection;
