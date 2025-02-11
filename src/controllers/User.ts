import { Request, Response } from "express";
import { UserService } from "../services";
import CustomRequest from "../interfaces/CustomRequest";
import Logger from "../utils/logger-helper";
import sendError from "../utils/error-helper";
import { IListUser } from "../interfaces/IUser";
import { validateJoi } from "../validations";
import { editUser, listUserList, registerUser } from "../validations/user.validations";

class UserController {
  service;

  constructor() {
    this.service = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      validateJoi(req, registerUser);
      const response = await this.service.register(req.body);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  getInfo = async (req: CustomRequest, res: Response) =>{
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const { user } = req;
      const response = await this.service.getInfo(user!);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  list = async (req: CustomRequest, res: Response) => {
    try {
      const payload = req.query as unknown as IListUser;
      validateJoi(req, listUserList);
      const response = await this.service.list(payload);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  delete = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.params);
      const params = req.params;
      const userId = Number(params.userId);
      await this.service.delete(userId);
      res.json({
        message: "Usuario ha sido eliminado",
      });
    } catch (error) {
      sendError(res, error);
    }
  }

  edit = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const params = req.params;
      const userId = Number(params.userId);
      const { user } = req;
      validateJoi(req, editUser);
      const response = await this.service.edit(userId, req.body, user!);
      res.json(response);
    } catch (error) {
      sendError(res, error);
    }
  }

  enable = async (req: CustomRequest, res: Response) => {
    try {
      Logger.info("-- Request --");
      Logger.info(req.body);
      const params = req.params;
      const userId = Number(params.userId);
      await this.service.enable(userId);
      res.json({
        message: "Usuario ha sido habilitado",
      });
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default UserController;
