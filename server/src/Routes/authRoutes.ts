import express, { Router } from "express";
import authController from "../Repositories/authController";
import { check } from "express-validator";
import { authMiddleware } from "../Middleware/auth-middleware";

const authRouter: Router = express.Router();

authRouter.post(
  "/registration",
  [
    check("email", "Check email plz").notEmpty().isEmail(),
    check("password", "password must be 6 - 14 symbols").isLength({ min: 6, max: 14 }),
  ],
  authController.registration
);
authRouter.post("/logout", authController.logout);
authRouter.post("/login", authController.login);
authRouter.get("/activation/:link", authController.getActivation);
authRouter.get("/users", authMiddleware, authController.users);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
