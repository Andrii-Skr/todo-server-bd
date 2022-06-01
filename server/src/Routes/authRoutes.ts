import express, { Router } from "express";
import authController from "../Repositories/authController";
import { check } from "express-validator";
import { authMiddleware } from "../Middleware/auth-middleware";

const autRouter: Router = express.Router();

autRouter.post(
  "/registration",
  [
    check("email", "Check email plz").notEmpty().isEmail(),
    check("password", "password must be 6 - 14 symbols").isLength({ min: 6, max: 14 }),
  ],
  authController.registration
);
autRouter.post("/logout", authController.logout);
autRouter.post("/login", authController.login);
autRouter.get("/activation/:link", authController.getActivation);
autRouter.get("/users", authMiddleware, authController.users);
autRouter.get("/refresh", authController.refresh);

export default autRouter;
