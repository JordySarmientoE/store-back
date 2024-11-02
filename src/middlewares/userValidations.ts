import { Request, Response, NextFunction } from "express";
import { ShopRepository } from "../repositories";

const validateRUC = async (req: Request, res: Response, next: NextFunction) => {
  const shopRepository = new ShopRepository();
  const { ruc } = req.body;
  const existsByRuc = await shopRepository.findByRuc(ruc);
  if (existsByRuc) {
    return res.status(400).json({
      message: `Tienda con ${ruc} ya existe`,
    });
  }

  next();
};

export { validateRUC };
