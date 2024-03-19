import express, { Express } from "express";
import cors from "cors";
import userRouters from "../auth/user.controller";
import movieRouter from "../movies/movies.controller";

export const routersConfig = (app: Express) => {
  app.use(express.json());
  app.use(cors());

  app.use("/api/v1/auth", userRouters);
  app.use("/api/v1/", movieRouter);
};
