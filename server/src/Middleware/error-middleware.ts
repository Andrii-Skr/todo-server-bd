import { ApiError } from "../Exceptions/api-error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void | any => {
  console.log(err);
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, error: err.errors });
  }
  return res.status(500).json({ message: "Somethink goes wrong =(  errorMiddleware" });
};
