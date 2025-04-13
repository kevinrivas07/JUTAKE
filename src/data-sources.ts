// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user";
import { Book } from "./entity/books";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true, //Indica que TypeORM debe sincronizar automáticamente la estructura de las tablas en la base de datos con las entidades de TypeScript.
  logging: false, // Si se pone en true, TypeORM va a mostrar por consola todas las consultas SQL ejecutadas.
  entities: [User,Book], // Aquí se indica el arreglo de entidades que TypeORM debe usar para crear las tablas. En este caso solo la entidad User
  migrations: [], // No puedes simplemente borrar la base de datos y volverla a crear desde cero (porque perderías datos de usuarios reales). Aquí es donde las migraciones son útiles: te permiten evolucionar la base de datos paso a paso, de forma controlada.
  subscribers: [], // son listeners que reaccionan a eventos del ciclo de vida de las entidades.
});