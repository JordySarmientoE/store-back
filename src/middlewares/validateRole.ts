import { Response, NextFunction } from "express";
import { Role, RoleEnum } from "../interfaces/IUser";
import CustomRequest from "../interfaces/CustomRequest";

const ValidateRole = (
  role: Role,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  if (user?.role !== role) {
    res.status(401).json({
      message: "Acceso no autorizado",
    });
  }
  next();
};

const ValidateAdmin = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = RoleEnum.ADMIN;
  ValidateRole(role, req, res, next);
};

const ValidateBuyer = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = RoleEnum.BUYER;
  ValidateRole(role, req, res, next);
};

const ValidateVendor = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const role = RoleEnum.VENDOR;
  ValidateRole(role, req, res, next);
};

export { ValidateAdmin, ValidateBuyer, ValidateVendor };
