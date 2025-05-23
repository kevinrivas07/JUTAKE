import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Book } from "./entity/books";
import { Loan } from "./entity/loan";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // true solo en desarrollo
  logging: false,
  entities: [User, Book, Loan],
  migrations: [],
  subscribers: [],
});