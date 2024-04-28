import { Request, Response } from "express";

class ShopController {
  constructor() {}
  
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    res.json({ name, email, password });
  }
}

export default ShopController;
