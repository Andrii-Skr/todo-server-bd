import "dotenv/config";
import express, { ErrorRequestHandler, Express } from "express";
import routes from "./Routes/routes";
import mongoose from "mongoose";
import authRoutes from "./Routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./Middleware/error-middleware";

const app: Express = express();
const port = process.env.port || 3200;

const connect = async () => {
  try {
    if (!process.env.DbUrl) {
      throw new Error("URL NOT DEFINED");
    }
    await mongoose.connect(process.env.DbUrl);
  } catch (error) {
    console.log("DB ? Which DB ?", error);
  }
};

connect();

const start = () => {
  try {
    const errorHanler: ErrorRequestHandler = (err, req, res, next): void | any => {
      // @ts-ignore
      if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error(err);
        // @ts-ignore
        return res.status(400).send({ message: err.message }); // Bad request
      }
      next();
    };
    app.use(errorHanler);
    app.use(express.json());
    app.use(cookieParser());
    app.use(
      cors({
        credentials: true,
        origin: process.env.Client_Url,
        optionsSuccessStatus: 200,
      })
    );
    app.use("/notes", routes);
    app.use("/auth", authRoutes);
    app.use(errorMiddleware);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
