import { Express } from "express";
import passport from "passport";

import { userJwtStrategy } from "../auth/jwt.strategy";

export const authConfig = (app: Express) => {
  userJwtStrategy(passport);
};
