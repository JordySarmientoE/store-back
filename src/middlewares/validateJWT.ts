import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories";
import CustomRequest from "../interfaces/CustomRequest";
import { IUser } from "../interfaces";

const repository = new UserRepository();

const validateJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY!);
    if (typeof decoded === "string") {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    const usuario = await repository.getById(decoded.uid!);

    if (!usuario || !usuario.status) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }

    req.user = usuario as IUser;

    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

export default validateJWT;
