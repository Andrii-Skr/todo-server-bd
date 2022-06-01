import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Authentication from "../Services/auth-service";
import { ApiError } from "../Exceptions/api-error";

class AuthControler {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("=(", errors.array()));
        //return res.json({ message: "reg err =(", errors });
      }
      const { email, password } = req.body;
      const userData = await Authentication.postRegistration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await Authentication.postLogin(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async users(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }
  async getActivation(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      console.log(activationLink);
      await Authentication.getActivation(activationLink);
      if (!process.env.Client_Url) {
        throw new Error("check Client_Url");
      }
      console.log(process.env.Client_Url);
      return res.redirect(process.env.Client_Url);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await Authentication.postLogout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await Authentication.getRefresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthControler();
