import { RequestHandler } from "express";
import { User } from "./entities/user.entity";
import { myDataSource } from "../core/typeOrmConfig";
import jwt, { JwtPayload } from "jsonwebtoken";

const userRepo = myDataSource.getRepository(User);

export const getUsers: RequestHandler = (req, res, next) => {
  res.send("Get Users");
};

export const signUp: RequestHandler = async (req, res, next) => {
  const { username, password, email, role }: User = req.body;

  if (await userRepo.findOne({ where: { email } })) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = userRepo.create({
    username,
    password,
    email,
    role,
  });
  await userRepo.save(user);
  const userfromdb = await userRepo.findOne({ where: { email } });
  const accessToken = userfromdb ? generateToken(userfromdb) : "";

  res
    .status(201)
    .json({ message: "User created", accessToken, role: user.role });
};

export const signIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userRepo.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = generateToken(user);
  res
    .status(200)
    .json({ message: "User logged in", accessToken, role: user.role });
};

const generateToken = (user: User) => {
  const payload: JwtPayload = {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  };
  const accessToken: string = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: "1d",
    algorithm: "HS256",
  });
  return `Bearer ${accessToken}`;
};
