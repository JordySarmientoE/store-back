import { Request } from "express";
import { IUser } from ".";

export default interface CustomRequest extends Request {
  user?: IUser;
}
