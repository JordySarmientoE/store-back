import mongoose from "mongoose";
import pino from "pino";

const dbConnection = async () => {
  const logger = pino();
  try {
    await mongoose.connect(process.env.MONGODB_CNN!, {});

    logger.info("Base de datos online");
  } catch (err) {
    logger.error(err);
    throw new Error("Error al iniciar la base de datos");
  }
};

export default dbConnection;
