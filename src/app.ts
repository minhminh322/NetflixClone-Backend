import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import "./core/typeOrmConfig";
import { authConfig } from "./core/auth.config";
import { routersConfig } from "./core/routes";

//For env File
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

authConfig(app);
routersConfig(app);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
