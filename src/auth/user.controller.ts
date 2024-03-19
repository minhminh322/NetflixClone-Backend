import express from "express";
import passport from "passport";
import { getUsers, signIn, signUp } from "./user.service";

const userRouters = express.Router();

userRouters
  .route("/users")
  .get(passport.authenticate("jwt", { session: false }), getUsers);

userRouters.route("/signup").post(signUp);
userRouters.route("/signin").post(signIn);
export default userRouters;
