import { Response, NextFunction } from "express";
import { RoleEnum } from "../interfaces/IUser";
import CustomRequest from "../interfaces/CustomRequest";

const ValidateAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = RoleEnum.ADMIN;
  const { user } = req;
  if (user?.role !== role) {
    return res.status(401).json({
      message: "Acceso no autorizado",
    });
  }
  next();
};

const ValidateBuyer = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = RoleEnum.BUYER;
  const { user } = req;
  if (user?.role !== role) {
    return res.status(401).json({
      message: "Acceso no autorizado",
    });
  }
  next();
};

const ValidateVendor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = RoleEnum.VENDOR;
  const { user } = req;
  if (user?.role !== role) {
    return res.status(401).json({
      message: "Acceso no autorizado",
    });
  }
  next();
};
export { ValidateAdmin, ValidateBuyer, ValidateVendor };
