import { DataSource } from "typeorm";
import "./env.config";
import { User } from "../auth/entities/user.entity";
export const myDataSource = new DataSource({
  type: "mongodb",
  url: process.env.MONGO_URL,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

(async () => {
  try {
    await myDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
})();
