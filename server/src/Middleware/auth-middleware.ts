import { NextFunction, Response, Request } from "express";
import TokenService from "../Services/token-service";
import { ApiError } from "../Exceptions/api-error";
import "../Store/types";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const checkToken = req.headers.autorization;
    console.log("checkToken", checkToken);
    if (!checkToken) {
      console.log("1");
      return next(ApiError.authorizationError());
    }
    if (typeof checkToken === "object") {
      return next(ApiError.authorizationError());
    }
    const token = checkToken.split(" ")[1];
    if (!process.env.JWT_AccessKey) {
      console.log("2");
      return next(ApiError.authorizationError());
    }
    const userData = TokenService.checkAccessToken(token) as string | JwtPayload;
    if (typeof userData === "string") {
      console.log("3");
      throw ApiError.authorizationError();
    }
    req.user = userData;
    console.log("userData", userData);
    next();
  } catch (error) {
    return next(ApiError.authorizationError());
  }
}
