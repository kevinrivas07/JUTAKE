import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Book } from "./entity/books";
import { Loan } from "./entity/loan";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // ✅ Cambia esto
  synchronize: false, // ⚠️ solo en desarrollo
  logging: false,
  entities: [User, Book, Loan],
  migrations: [],
  subscribers: [],
});
