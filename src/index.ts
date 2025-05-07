// src/index.ts
import express from "express";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/books.routes";
import { AppDataSource } from "./data-sources";
import cors from 'cors';


const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

AppDataSource.initialize().then(() => {
  app.use("/api/users", userRoutes);
  app.use("/api/books", bookRoutes);
  app.listen(3000, () =>
    console.log("Server listening on http://localhost:3000")
  );
}).catch((error) => {
  console.error("Error al conectar con la base de datos:", error);
});